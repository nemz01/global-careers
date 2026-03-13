import { redirect } from "next/navigation"
import { createClient } from "@supabase/supabase-js"
import { cookies } from "next/headers"
import { DashboardShell } from "@/components/dashboard/dashboard-shell"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseAnonKey) {
    redirect("/auth/login")
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: { persistSession: false },
  })

  const cookieStore = await cookies()
  const allCookies = cookieStore.getAll()

  const customAccessToken = cookieStore.get("sb-access-token")

  const accessTokenCookie = customAccessToken || allCookies.find(
    (cookie) =>
      cookie.name.includes("auth-token") ||
      (cookie.name.startsWith("sb-") && cookie.name.endsWith("-auth-token"))
  )

  let accessToken: string | null = accessTokenCookie?.value || null

  if (!accessToken) {
    const sessionCookie = allCookies.find(
      (cookie) =>
        cookie.name.startsWith("sb-") && cookie.name.endsWith("-auth-token.0")
    )
    if (sessionCookie) {
      try {
        const chunks: string[] = []
        let i = 0
        while (true) {
          const chunk = allCookies.find(
            (c) => c.name === sessionCookie.name.replace(".0", i === 0 ? ".0" : `.${i}`)
          )
          if (!chunk) break
          chunks.push(chunk.value)
          i++
        }
        const decoded = JSON.parse(
          Buffer.from(chunks.join(""), "base64").toString("utf-8")
        )
        accessToken = decoded?.access_token || null
      } catch {
        // Failed to decode
      }
    }
  }

  if (!accessToken) {
    redirect("/auth/login")
  }

  const { data: { user }, error } = await supabase.auth.getUser(accessToken)

  if (error || !user) {
    redirect("/auth/login")
  }

  return <DashboardShell>{children}</DashboardShell>
}

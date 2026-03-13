"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchWithAuth } from "@/lib/auth"
import { Mail } from "lucide-react"

export default function EmailQueuePage() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-emails"],
    queryFn: async () => {
      const res = await fetchWithAuth("/api/dashboard/metrics?type=emails")
      return res.json()
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary-cyan/10 p-2.5">
          <Mail className="h-5 w-5 text-primary-cyan" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-slate-100">Email Queue</h1>
          <p className="text-sm text-slate-400">{data?.count || 0} emails in queue</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-8">
        <p className="text-center text-slate-400">
          {isLoading ? "Loading..." : "Email queue management will display pending, sent, and failed emails."}
        </p>
      </div>
    </div>
  )
}

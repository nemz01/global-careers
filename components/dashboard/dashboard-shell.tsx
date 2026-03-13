"use client"

import * as React from "react"
import { Sidebar } from "@/components/dashboard/sidebar"
import { Topbar } from "@/components/dashboard/topbar"
import { Toaster } from "@/components/ui/toaster"
import { QueryProvider } from "@/lib/query-client"
import { cn } from "@/lib/utils"

export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false)

  return (
    <QueryProvider>
      <div className="min-h-screen bg-slate-950">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
        <Topbar sidebarCollapsed={sidebarCollapsed} />
        <main
          className={cn(
            "min-h-screen pt-16 transition-all duration-300",
            sidebarCollapsed ? "pl-16" : "pl-64"
          )}
        >
          <div className="p-6">{children}</div>
        </main>
        <Toaster />
      </div>
    </QueryProvider>
  )
}

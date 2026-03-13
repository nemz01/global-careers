"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchWithAuth } from "@/lib/auth"
import { BarChart3, UserSearch, Users, Calendar, Calculator } from "lucide-react"
import { KpiCard } from "@/components/dashboard/kpi-card"

export default function ReportsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-full-metrics"],
    queryFn: async () => {
      const res = await fetchWithAuth("/api/dashboard/metrics")
      return res.json()
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary-cyan/10 p-2.5">
          <BarChart3 className="h-5 w-5 text-primary-cyan" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-slate-100">Reports</h1>
          <p className="text-sm text-slate-400">Platform metrics and analytics</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Total Leads"
          value={data?.totalLeads || 0}
          description={`${data?.weekLeads || 0} this week`}
          icon={UserSearch}
          loading={isLoading}
        />
        <KpiCard
          title="Candidates"
          value={data?.totalCandidates || 0}
          description="In pipeline"
          icon={Users}
          loading={isLoading}
        />
        <KpiCard
          title="Bookings"
          value={data?.totalBookings || 0}
          description="Total scheduled"
          icon={Calendar}
          loading={isLoading}
        />
        <KpiCard
          title="Calculator Uses"
          value={data?.totalCalculator || 0}
          description="Savings calculations"
          icon={Calculator}
          loading={isLoading}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
          <h3 className="mb-2 text-sm font-medium text-slate-400">Placements</h3>
          <p className="text-3xl font-semibold text-slate-100">{data?.totalPlacements || 0}</p>
          <p className="mt-1 text-xs text-slate-500">Active placements</p>
        </div>
        <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
          <h3 className="mb-2 text-sm font-medium text-slate-400">Pending Emails</h3>
          <p className="text-3xl font-semibold text-slate-100">{data?.pendingEmails || 0}</p>
          <p className="mt-1 text-xs text-slate-500">In queue</p>
        </div>
      </div>
    </div>
  )
}

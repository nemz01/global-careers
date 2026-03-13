"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchWithAuth } from "@/lib/auth"
import { Briefcase } from "lucide-react"

export default function PlacementsPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-placements"],
    queryFn: async () => {
      const res = await fetchWithAuth("/api/dashboard/metrics?type=placements")
      return res.json()
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary-cyan/10 p-2.5">
          <Briefcase className="h-5 w-5 text-primary-cyan" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-slate-100">Placements</h1>
          <p className="text-sm text-slate-400">{data?.count || 0} total placements</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-8">
        <p className="text-center text-slate-400">
          {isLoading ? "Loading..." : "Placement tracking will be populated as candidates are placed with clients."}
        </p>
      </div>
    </div>
  )
}

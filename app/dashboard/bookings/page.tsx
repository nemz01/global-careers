"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchWithAuth } from "@/lib/auth"
import { Calendar, Filter } from "lucide-react"

export default function BookingsPage() {
  const [statusFilter, setStatusFilter] = React.useState("")

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-bookings", statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (statusFilter) params.set("status", statusFilter)
      const res = await fetchWithAuth(`/api/dashboard/bookings?${params}`)
      return res.json()
    },
  })

  const bookings = data?.bookings || []

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="rounded-lg bg-primary-cyan/10 p-2.5">
          <Calendar className="h-5 w-5 text-primary-cyan" />
        </div>
        <div>
          <h1 className="text-2xl font-semibold text-slate-100">Bookings</h1>
          <p className="text-sm text-slate-400">{data?.total || 0} total bookings</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Filter className="h-4 w-4 text-slate-400" />
        {["", "pending", "confirmed", "completed", "cancelled", "no_show"].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              statusFilter === s ? "bg-primary-cyan/20 text-primary-cyan" : "text-slate-400 hover:bg-slate-800"
            }`}
          >
            {s || "All"}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-left">
                <th className="px-4 py-3 font-medium text-slate-400">Client</th>
                <th className="px-4 py-3 font-medium text-slate-400">Email</th>
                <th className="px-4 py-3 font-medium text-slate-400">Type</th>
                <th className="px-4 py-3 font-medium text-slate-400">Date</th>
                <th className="px-4 py-3 font-medium text-slate-400">Time</th>
                <th className="px-4 py-3 font-medium text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-slate-800/50">
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} className="px-4 py-3"><div className="h-4 w-24 animate-pulse rounded bg-slate-800" /></td>
                    ))}
                  </tr>
                ))
              ) : bookings.length === 0 ? (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-500">No bookings found</td></tr>
              ) : (
                bookings.map((b: Record<string, string>) => (
                  <tr key={b.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                    <td className="px-4 py-3 text-slate-100">{b.client_name}</td>
                    <td className="px-4 py-3 text-slate-300">{b.email}</td>
                    <td className="px-4 py-3 text-slate-300">{b.booking_type?.replace(/_/g, " ")}</td>
                    <td className="px-4 py-3 text-slate-300">{b.date}</td>
                    <td className="px-4 py-3 text-slate-300">{b.time_slot}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        b.status === "pending" ? "bg-yellow-500/10 text-yellow-400" :
                        b.status === "confirmed" ? "bg-emerald-500/10 text-emerald-400" :
                        b.status === "completed" ? "bg-primary-cyan/10 text-primary-cyan" :
                        "bg-red-500/10 text-red-400"
                      }`}>
                        {b.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

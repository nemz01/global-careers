"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchWithAuth } from "@/lib/auth"
import { Users, Download, Filter } from "lucide-react"

export default function CandidatesPage() {
  const [statusFilter, setStatusFilter] = React.useState("")

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-candidates", statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (statusFilter) params.set("status", statusFilter)
      const res = await fetchWithAuth(`/api/dashboard/candidates?${params}`)
      return res.json()
    },
  })

  const candidates = data?.candidates || []

  const exportCSV = () => {
    if (!candidates.length) return
    const headers = ["Name", "Email", "Country", "Role Interest", "Experience", "Status", "English"]
    const rows = candidates.map((c: Record<string, string | number>) => [c.full_name, c.email, c.country, c.role_interest, c.experience_years, c.status, c.english_level])
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "candidates.csv"
    a.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary-cyan/10 p-2.5">
            <Users className="h-5 w-5 text-primary-cyan" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-slate-100">Candidates</h1>
            <p className="text-sm text-slate-400">{data?.total || 0} total candidates</p>
          </div>
        </div>
        <button onClick={exportCSV} className="flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800">
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <Filter className="h-4 w-4 text-slate-400" />
        {["", "new", "screening", "tested", "interviewed", "approved", "placed", "rejected"].map((s) => (
          <button
            key={s}
            onClick={() => setStatusFilter(s)}
            className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
              statusFilter === s
                ? "bg-primary-cyan/20 text-primary-cyan"
                : "text-slate-400 hover:bg-slate-800 hover:text-slate-100"
            }`}
          >
            {s || "All"}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-left">
                <th className="px-4 py-3 font-medium text-slate-400">Name</th>
                <th className="px-4 py-3 font-medium text-slate-400">Email</th>
                <th className="px-4 py-3 font-medium text-slate-400">Country</th>
                <th className="px-4 py-3 font-medium text-slate-400">Role Interest</th>
                <th className="px-4 py-3 font-medium text-slate-400">Experience</th>
                <th className="px-4 py-3 font-medium text-slate-400">English</th>
                <th className="px-4 py-3 font-medium text-slate-400">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-slate-800/50">
                    {Array.from({ length: 7 }).map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 w-24 animate-pulse rounded bg-slate-800" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : candidates.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                    No candidates found
                  </td>
                </tr>
              ) : (
                candidates.map((c: Record<string, string | number | string[]>) => (
                  <tr key={c.id as string} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                    <td className="px-4 py-3 text-slate-100">{c.full_name as string}</td>
                    <td className="px-4 py-3 text-slate-300">{c.email as string}</td>
                    <td className="px-4 py-3 text-slate-300">{c.country as string}</td>
                    <td className="px-4 py-3 text-slate-300">{c.role_interest as string}</td>
                    <td className="px-4 py-3 text-slate-300">{c.experience_years as number}y</td>
                    <td className="px-4 py-3 text-slate-300">{c.english_level as string}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        c.status === "new" ? "bg-blue-500/10 text-blue-400" :
                        c.status === "approved" ? "bg-emerald-500/10 text-emerald-400" :
                        c.status === "placed" ? "bg-primary-cyan/10 text-primary-cyan" :
                        c.status === "rejected" ? "bg-red-500/10 text-red-400" :
                        "bg-slate-500/10 text-slate-400"
                      }`}>
                        {c.status as string}
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

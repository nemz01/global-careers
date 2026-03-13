"use client"

import * as React from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchWithAuth } from "@/lib/auth"
import { UserSearch, Download, Filter } from "lucide-react"

export default function LeadsPage() {
  const [statusFilter, setStatusFilter] = React.useState("")

  const { data, isLoading } = useQuery({
    queryKey: ["dashboard-leads", statusFilter],
    queryFn: async () => {
      const params = new URLSearchParams()
      if (statusFilter) params.set("status", statusFilter)
      const res = await fetchWithAuth(`/api/dashboard/leads?${params}`)
      return res.json()
    },
  })

  const leads = data?.leads || []

  const exportCSV = () => {
    if (!leads.length) return
    const headers = ["Name", "Email", "Company", "Status", "Source", "Created"]
    const rows = leads.map((l: Record<string, string>) => [l.name, l.email, l.company || "", l.status, l.source, new Date(l.created_at).toLocaleDateString()])
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n")
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "leads.csv"
    a.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary-cyan/10 p-2.5">
            <UserSearch className="h-5 w-5 text-primary-cyan" />
          </div>
          <div>
            <h1 className="text-2xl font-semibold text-slate-100">Business Leads</h1>
            <p className="text-sm text-slate-400">{data?.total || 0} total leads</p>
          </div>
        </div>
        <button onClick={exportCSV} className="flex items-center gap-2 rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800">
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3">
        <Filter className="h-4 w-4 text-slate-400" />
        {["", "new", "contacted", "qualified", "proposal", "won", "lost"].map((s) => (
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
                <th className="px-4 py-3 font-medium text-slate-400">Company</th>
                <th className="px-4 py-3 font-medium text-slate-400">Status</th>
                <th className="px-4 py-3 font-medium text-slate-400">Source</th>
                <th className="px-4 py-3 font-medium text-slate-400">Date</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="border-b border-slate-800/50">
                    {Array.from({ length: 6 }).map((_, j) => (
                      <td key={j} className="px-4 py-3">
                        <div className="h-4 w-24 animate-pulse rounded bg-slate-800" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
                    No leads found
                  </td>
                </tr>
              ) : (
                leads.map((lead: Record<string, string>) => (
                  <tr key={lead.id} className="border-b border-slate-800/50 hover:bg-slate-800/30">
                    <td className="px-4 py-3 text-slate-100">{lead.name}</td>
                    <td className="px-4 py-3 text-slate-300">{lead.email}</td>
                    <td className="px-4 py-3 text-slate-300">{lead.company || "—"}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                        lead.status === "new" ? "bg-blue-500/10 text-blue-400" :
                        lead.status === "qualified" ? "bg-emerald-500/10 text-emerald-400" :
                        lead.status === "won" ? "bg-primary-cyan/10 text-primary-cyan" :
                        lead.status === "lost" ? "bg-red-500/10 text-red-400" :
                        "bg-slate-500/10 text-slate-400"
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-400">{lead.source}</td>
                    <td className="px-4 py-3 text-slate-400">{new Date(lead.created_at).toLocaleDateString()}</td>
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

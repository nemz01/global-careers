"use client"

import * as React from "react"
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts"
import { Skeleton } from "@/components/ui/skeleton"

interface ChartContainerProps {
  title: string
  children: React.ReactNode
  loading?: boolean
}

export function ChartContainer({
  title,
  children,
  loading = false,
}: ChartContainerProps) {
  if (loading) {
    return (
      <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
        <Skeleton className="mb-4 h-5 w-32" />
        <Skeleton className="h-[200px] w-full" />
      </div>
    )
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
      <h3 className="mb-4 text-sm font-medium text-slate-400">{title}</h3>
      {children}
    </div>
  )
}

interface LeadsChartProps {
  data: { week: string; leads: number }[]
}

export function LeadsChart({ data }: LeadsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="week" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "8px",
            color: "#f1f5f9",
          }}
        />
        <Line type="monotone" dataKey="leads" stroke="#00A3E0" strokeWidth={2} dot={{ fill: "#00A3E0", strokeWidth: 2 }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  )
}

interface BookingsChartProps {
  data: { day: string; bookings: number }[]
}

export function BookingsChart({ data }: BookingsChartProps) {
  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
        <XAxis dataKey="day" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
        <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
        <Tooltip
          contentStyle={{
            backgroundColor: "#1e293b",
            border: "1px solid #334155",
            borderRadius: "8px",
            color: "#f1f5f9",
          }}
        />
        <Bar dataKey="bookings" fill="#00A3E0" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  )
}

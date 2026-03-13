"use client"

import * as React from "react"
import Link from "next/link"
import { useQuery } from "@tanstack/react-query"
import {
  Users,
  UserSearch,
  Calendar,
  Briefcase,
  ArrowRight,
  Calculator,
} from "lucide-react"
import { fetchWithAuth } from "@/lib/auth"
import { KpiCard } from "@/components/dashboard/kpi-card"
import {
  ChartContainer,
  LeadsChart,
  BookingsChart,
} from "@/components/dashboard/charts"

export const dynamic = 'force-dynamic';

async function fetchDashboardStats() {
  const [leadsRes, candidatesRes, bookingsRes, calculatorRes] = await Promise.all([
    fetchWithAuth("/api/dashboard/metrics?type=leads"),
    fetchWithAuth("/api/dashboard/metrics?type=candidates"),
    fetchWithAuth("/api/dashboard/metrics?type=bookings"),
    fetchWithAuth("/api/dashboard/metrics?type=calculator"),
  ])

  const [leadsData, candidatesData, bookingsData, calculatorData] = await Promise.all([
    leadsRes.ok ? leadsRes.json() : { count: 0 },
    candidatesRes.ok ? candidatesRes.json() : { count: 0 },
    bookingsRes.ok ? bookingsRes.json() : { count: 0 },
    calculatorRes.ok ? calculatorRes.json() : { count: 0 },
  ])

  return {
    leads: leadsData.count || 0,
    candidates: candidatesData.count || 0,
    bookings: bookingsData.count || 0,
    calculator: calculatorData.count || 0,
  }
}

const leadsChartData = [
  { week: "W1", leads: 5 },
  { week: "W2", leads: 8 },
  { week: "W3", leads: 12 },
  { week: "W4", leads: 15 },
  { week: "W5", leads: 11 },
  { week: "W6", leads: 18 },
]

const bookingsChartData = [
  { day: "Mon", bookings: 2 },
  { day: "Tue", bookings: 4 },
  { day: "Wed", bookings: 3 },
  { day: "Thu", bookings: 5 },
  { day: "Fri", bookings: 3 },
]

const quickActions = [
  {
    title: "View Leads",
    description: "Manage business leads and inquiries",
    href: "/dashboard/leads",
    icon: UserSearch,
  },
  {
    title: "Candidates",
    description: "Browse and manage candidate pipeline",
    href: "/dashboard/candidates",
    icon: Users,
  },
]

export default function DashboardPage() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: fetchDashboardStats,
  })

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-slate-100">
          Overview
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Welcome to the Global Careers Dashboard
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Business Leads"
          value={stats?.leads || 0}
          description="Total inquiries"
          icon={UserSearch}
          loading={isLoading}
          trend={{ value: 12, isPositive: true }}
        />
        <KpiCard
          title="Candidates"
          value={stats?.candidates || 0}
          description="Talent pipeline"
          icon={Users}
          loading={isLoading}
          trend={{ value: 8, isPositive: true }}
        />
        <KpiCard
          title="Bookings"
          value={stats?.bookings || 0}
          description="Scheduled calls"
          icon={Calendar}
          loading={isLoading}
        />
        <KpiCard
          title="Calculator Uses"
          value={stats?.calculator || 0}
          description="Savings calculations"
          icon={Calculator}
          loading={isLoading}
        />
      </div>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <ChartContainer title="Leads (last 6 weeks)" loading={isLoading}>
          <LeadsChart data={leadsChartData} />
        </ChartContainer>
        <ChartContainer title="Bookings this week" loading={isLoading}>
          <BookingsChart data={bookingsChartData} />
        </ChartContainer>
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="mb-4 text-lg font-medium text-slate-100">
          Quick Actions
        </h2>
        <div className="grid gap-4 md:grid-cols-2">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href}>
              <div className="group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900/50 p-4 transition-colors hover:border-slate-700 hover:bg-slate-900">
                <div className="flex items-center gap-4">
                  <div className="rounded-lg bg-primary-cyan/10 p-2.5">
                    <action.icon className="h-5 w-5 text-primary-cyan" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-100">{action.title}</p>
                    <p className="text-sm text-slate-400">
                      {action.description}
                    </p>
                  </div>
                </div>
                <ArrowRight className="h-5 w-5 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-primary-cyan" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Data Navigation */}
      <div>
        <h2 className="mb-4 text-lg font-medium text-slate-100">
          Explore Data
        </h2>
        <div className="flex flex-wrap gap-3">
          <Link href="/dashboard/leads" className="inline-flex items-center rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-slate-100">
            <UserSearch className="mr-2 h-4 w-4" />
            Leads
          </Link>
          <Link href="/dashboard/candidates" className="inline-flex items-center rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-slate-100">
            <Users className="mr-2 h-4 w-4" />
            Candidates
          </Link>
          <Link href="/dashboard/bookings" className="inline-flex items-center rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-slate-100">
            <Calendar className="mr-2 h-4 w-4" />
            Bookings
          </Link>
          <Link href="/dashboard/placements" className="inline-flex items-center rounded-lg border border-slate-700 px-4 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-slate-100">
            <Briefcase className="mr-2 h-4 w-4" />
            Placements
          </Link>
        </div>
      </div>
    </div>
  )
}

"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  UserSearch,
  BarChart3,
  ChevronLeft,
  LogOut,
  Mail,
  Calendar,
  Briefcase,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import { signOut } from "@/lib/auth"

interface NavItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

interface NavGroup {
  title: string
  items: NavItem[]
}

const navGroups: NavGroup[] = [
  {
    title: "Main",
    items: [
      {
        title: "Overview",
        href: "/dashboard",
        icon: LayoutDashboard,
      },
    ],
  },
  {
    title: "Acquisition",
    items: [
      {
        title: "Leads",
        href: "/dashboard/leads",
        icon: UserSearch,
      },
      {
        title: "Candidates",
        href: "/dashboard/candidates",
        icon: Users,
      },
      {
        title: "Bookings",
        href: "/dashboard/bookings",
        icon: Calendar,
      },
    ],
  },
  {
    title: "Management",
    items: [
      {
        title: "Placements",
        href: "/dashboard/placements",
        icon: Briefcase,
      },
      {
        title: "Email Queue",
        href: "/dashboard/email-queue",
        icon: Mail,
      },
      {
        title: "Reports",
        href: "/dashboard/reports",
        icon: BarChart3,
      },
    ],
  },
]

interface SidebarProps {
  collapsed?: boolean
  onToggle?: () => void
}

export function Sidebar({ collapsed = false, onToggle }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push("/auth/login")
  }

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen border-r border-slate-800 bg-slate-950 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex h-full flex-col">
        {/* Logo */}
        <div className="flex h-16 items-center justify-between border-b border-slate-800 px-3">
          <Link href="/dashboard" className={cn("flex items-center", collapsed && "mx-auto")}>
            <span className={cn(
              "font-bold text-primary-cyan transition-all",
              collapsed ? "text-lg" : "text-lg"
            )}>
              {collapsed ? "GC" : "Global Careers"}
            </span>
          </Link>
          {!collapsed && (
            <button
              onClick={onToggle}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-100"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
        </div>
        {collapsed && (
          <div className="flex justify-center border-b border-slate-800 py-2">
            <button
              onClick={onToggle}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-100"
            >
              <ChevronLeft className="h-4 w-4 rotate-180" />
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto p-2">
          {navGroups.map((group, groupIndex) => (
            <div key={group.title}>
              {groupIndex > 0 && <Separator className="my-2" />}
              {!collapsed && (
                <h3 className="mb-2 px-3 text-xs font-medium uppercase tracking-wider text-slate-500">
                  {group.title}
                </h3>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = pathname === item.href ||
                    (item.href !== "/dashboard" && pathname.startsWith(item.href))
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                        isActive
                          ? "bg-primary-cyan/10 text-primary-cyan"
                          : "text-slate-400 hover:bg-slate-800 hover:text-slate-100",
                        collapsed && "justify-center px-2"
                      )}
                      title={collapsed ? item.title : undefined}
                    >
                      <item.icon className="h-5 w-5 shrink-0" />
                      {!collapsed && <span>{item.title}</span>}
                    </Link>
                  )
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="border-t border-slate-800 p-2">
          <button
            onClick={handleSignOut}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-400 transition-colors hover:bg-slate-800 hover:text-slate-100",
              collapsed && "justify-center px-2"
            )}
            title={collapsed ? "Sign Out" : undefined}
          >
            <LogOut className="h-5 w-5 shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
          {!collapsed && (
            <p className="mt-2 px-3 text-xs text-slate-500">
              &copy; 2026 Global Careers
            </p>
          )}
        </div>
      </div>
    </aside>
  )
}

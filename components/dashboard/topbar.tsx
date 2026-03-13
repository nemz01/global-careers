"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { Bell, Search, User, LogOut } from "lucide-react"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "@/lib/auth"

interface TopbarProps {
  sidebarCollapsed?: boolean
}

export function Topbar({ sidebarCollapsed = false }: TopbarProps) {
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push("/auth/login")
  }

  return (
    <header
      className="fixed right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950/80 px-6 backdrop-blur-sm"
      style={{
        left: sidebarCollapsed ? "4rem" : "16rem",
        transition: "left 0.3s",
      }}
    >
      {/* Search */}
      <div className="relative w-full max-w-md">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
        <Input
          type="search"
          placeholder="Search leads, candidates, bookings..."
          className="pl-10"
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative rounded-lg p-2 text-slate-400 hover:bg-slate-800 hover:text-slate-100">
          <Bell className="h-5 w-5" />
          <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary-cyan text-[10px] font-medium text-dark-navy">
            3
          </span>
        </button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-800 text-slate-400 hover:text-slate-100">
              <User className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Bell className="mr-2 h-4 w-4" />
              Notifications
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-400 focus:text-red-400" onClick={handleSignOut}>
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

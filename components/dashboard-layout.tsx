"use client"

import type React from "react"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Activity, Map, AlertTriangle } from "lucide-react"
import { cn } from "@/lib/utils"

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  const navigation = [
    {
      name: "Painel de Risco",
      href: "/dashboard",
      icon: Activity,
      current: pathname === "/",
    },
    {
      name: "Simulador de Impacto",
      href: "/simulador",
      icon: Map,
      current: pathname === "/simulador",
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 border-r flex flex-col ">
        <div className="p-6 border-b ">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground ">Asteroid Impact</h1>
              <p className="text-xs text-muted-foreground">Sistema de Risco</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 bg-ba">
          {navigation.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  item.current
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-foreground hover:bg-sidebar-accent/50",
                )}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t">
          <div className="text-xs text-foreground">
            <p>Última atualização</p>
            <p className="font-mono text-foreground mt-1">{new Date().toLocaleString("pt-BR")}</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  )
}

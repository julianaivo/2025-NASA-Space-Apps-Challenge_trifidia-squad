"use client"
import { KpiCard } from "@/components/kpi-card"
import { RiskGauge } from "@/components/risk-gauge"
import { ThreatClassification } from "@/components/threat-classification"
import { AsteroidProfile } from "@/components/asteroid-profile"
import { DamageBreakdown } from "@/components/damage-breakdown"
import { ConsequencesReport } from "@/components/consequences-report"
import { Users, DollarSign, Zap } from "lucide-react"

export function RiskDashboard() {
  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Painel de Risco</h1>
        <p className="text-muted-foreground mt-1">Análise de impacto do asteroide 2024 XR-7</p>
      </div>

      {/* Row 1: KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard
          title="População em Risco"
          value="2.847.392"
          subtitle="pessoas na zona de impacto"
          icon={Users}
          trend={{ value: 12, direction: "up" }}
        />
        <KpiCard
          title="Impacto Econômico"
          value="$47.2B"
          subtitle="estimativa de danos"
          icon={DollarSign}
          trend={{ value: 8, direction: "up" }}
        />
        <KpiCard title="Energia de Impacto" value="850" subtitle="megatons TNT equivalente" icon={Zap} />
      </div>

      {/* Row 2: Risk Index, Threat Classification, Asteroid Profile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <RiskGauge />
        <ThreatClassification />
        <AsteroidProfile />
      </div>

      {/* Row 3: Damage Breakdown and Consequences Report */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DamageBreakdown />
        <ConsequencesReport />
      </div>
    </div>
  )
}

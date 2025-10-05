"use client"
import { KpiCard } from "@/components/kpi-card"
import { RiskGauge } from "@/components/risk-gauge"
import { ThreatClassification } from "@/components/threat-classification"
import { AsteroidProfile } from "@/components/asteroid-profile"
import { DamageBreakdown } from "@/components/damage-breakdown"
import { ConsequencesReport } from "@/components/consequences-report"
import { useSimulationContext } from "@/contexts/SimulationContext"
import { Users, DollarSign, Zap } from "lucide-react"

export function RiskDashboard() {
  const { simulationState, hasSimulationData } = useSimulationContext();
  
  // Função para formatar números
  const formatNumber = (num: number): string => {
    if (num >= 1e9) {
      return `${(num / 1e9).toFixed(1)}B`;
    } else if (num >= 1e6) {
      return `${(num / 1e6).toFixed(1)}M`;
    } else if (num >= 1e3) {
      return `${(num / 1e3).toFixed(1)}K`;
    }
    return num.toLocaleString();
  };

  // Função para formatar valor monetário
  const formatCurrency = (value: number): string => {
    if (value >= 1e9) {
      return `$${(value / 1e9).toFixed(1)}B`;
    } else if (value >= 1e6) {
      return `$${(value / 1e6).toFixed(1)}M`;
    }
    return `$${value.toLocaleString()}`;
  };

  // Se não há dados de simulação, usar valores padrão
  const kpis = simulationState.data?.kpis || {
    population_in_risk: 0,
    impacto_economico_usd: 0,
    impact_energy_megatons: 0,
    final_damage_radius_km: 0,
    is_pha_prediction: false,
    risk_assessment_source: "Pending"
  };

  return (
    <div className="p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Risk Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          {hasSimulationData 
            ? `Impact analysis - ${simulationState.data?.details?.input_params?.asteroid_type || 'Asteroid'}`
            : 'Waiting for simulation data'
          }
        </p>
      </div>

      {/* Row 1: KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard
          title="Population at Risk"
          value={formatNumber(kpis.population_in_risk)}
          subtitle="people in impact zone"
          icon={Users}
          trend={hasSimulationData ? { value: 12, direction: "up" } : undefined}
        />
        <KpiCard
          title="Economic Impact"
          value={formatCurrency(kpis.impacto_economico_usd)}
          subtitle="damage estimate"
          icon={DollarSign}
          trend={hasSimulationData ? { value: 8, direction: "up" } : undefined}
        />
        <KpiCard 
          title="Impact Energy" 
          value={kpis.impact_energy_megatons.toFixed(1)} 
          subtitle="megatons TNT equivalent" 
          icon={Zap} 
        />
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

// Exemplo de como usar os dados da simulação no dashboard
"use client"

import { useSimulationContext, useSimulationKPIs, useSimulationDetails } from "@/contexts/SimulationContext"
import { Card } from "@/components/ui/card"

export function DashboardExample() {
  const { simulationState, hasSimulationData } = useSimulationContext()
  const kpis = useSimulationKPIs()
  const details = useSimulationDetails()

  if (!hasSimulationData) {
    return (
      <div className="p-6">
        <h1>Dashboard</h1>
        <p>Nenhuma simulação disponível. Execute uma simulação primeiro.</p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard de Impacto</h1>
      
      {/* KPIs */}
      {kpis && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground">População em Risco</h3>
            <p className="text-2xl font-bold">{kpis.population_in_risk.toLocaleString()}</p>
          </Card>
          
          <Card className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Impacto Econômico</h3>
            <p className="text-2xl font-bold">${(kpis.impacto_economico_usd / 1e9).toFixed(1)}B</p>
          </Card>
          
          <Card className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Energia (MT)</h3>
            <p className="text-2xl font-bold">{kpis.impact_energy_megatons.toFixed(1)}</p>
          </Card>
          
          <Card className="p-4">
            <h3 className="text-sm font-medium text-muted-foreground">Raio de Dano (km)</h3>
            <p className="text-2xl font-bold">{kpis.final_damage_radius_km.toFixed(1)}</p>
          </Card>
        </div>
      )}

      {/* Detalhes */}
      {details && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Parâmetros de Entrada</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Diâmetro:</span>
                <span>{details.input_params.diameter_km} km</span>
              </div>
              <div className="flex justify-between">
                <span>Velocidade:</span>
                <span>{details.input_params.velocity_km_s} km/s</span>
              </div>
              <div className="flex justify-between">
                <span>Ângulo:</span>
                <span>{details.input_params.impact_angle}°</span>
              </div>
              <div className="flex justify-between">
                <span>Localização:</span>
                <span>{details.input_params.impact_lat}, {details.input_params.impact_lng}</span>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Relatório IA</h3>
            <p className="text-sm">{details.llm_report}</p>
          </Card>
        </div>
      )}
    </div>
  )
}
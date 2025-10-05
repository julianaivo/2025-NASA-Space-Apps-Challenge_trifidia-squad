"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { SimulationConfig } from "@/components/simulator-wizard"
import { ChevronLeft, MapPin, Rocket, Target } from "lucide-react"

type SummaryStepProps = {
  config: SimulationConfig
  setConfig: (config: SimulationConfig) => void
  onNext: () => void
  onBack: () => void
  isFirstStep: boolean
  isLastStep: boolean
}

export function SummaryStep({ config, onBack }: SummaryStepProps) {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Resumo da Configuração</h2>
        <p className="text-muted-foreground">Revise todos os parâmetros antes de executar a simulação</p>
      </div>

      <div className="grid gap-6">
        {/* Location Summary */}
        <Card className="p-6 border-2 border-primary/30">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <MapPin className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-primary mb-3">Localização</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Latitude:</span>
                  <p className="text-lg font-mono text-foreground">{config.location?.lat.toFixed(4)}°</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Longitude:</span>
                  <p className="text-lg font-mono text-foreground">{config.location?.lng.toFixed(4)}°</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Projectile Summary */}
        <Card className="p-6 border-2 border-primary/30">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Rocket className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-primary mb-3">Parâmetros do Projétil</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Diâmetro:</span>
                  <p className="text-lg font-mono text-foreground">
                    {config.projectile.diameter} {config.projectile.diameterUnit}
                  </p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Densidade:</span>
                  <p className="text-lg font-mono text-foreground">
                    {config.projectile.density} {config.projectile.densityUnit}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Impact Summary */}
        <Card className="p-6 border-2 border-primary/30">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Target className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-primary mb-3">Parâmetros do Impacto</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <span className="text-sm text-muted-foreground">Ângulo:</span>
                  <p className="text-lg font-mono text-foreground">{config.impact.angle}°</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Velocidade:</span>
                  <p className="text-lg font-mono text-foreground">{config.impact.velocity} km/s</p>
                </div>
                <div>
                  <span className="text-sm text-muted-foreground">Tipo de Alvo:</span>
                  <p className="text-lg font-mono text-foreground">{config.target.type}</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Configuration Summary Box */}
        <Card className="p-6 bg-card/50 border-2 border-primary/30">
          <h3 className="text-lg font-semibold text-primary mb-4">Resumo da Configuração</h3>
          <div className="space-y-2 font-mono text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Número de Configuração:</span>
              <span className="text-foreground">#{Math.floor(Math.random() * 10000)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Diâmetro:</span>
              <span className="text-primary">
                {config.projectile.diameter} {config.projectile.diameterUnit}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Velocidade:</span>
              <span className="text-primary">{config.impact.velocity} km/s</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ângulo:</span>
              <span className="text-primary">{config.impact.angle}°</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Densidade:</span>
              <span className="text-primary">
                {config.projectile.density} {config.projectile.densityUnit}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Tipo de Alvo:</span>
              <span className="text-primary">{config.target.type}</span>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline" size="lg" className="gap-2 bg-transparent">
          <ChevronLeft className="w-5 h-5" />
          Voltar
        </Button>
        <Button size="lg" className="gap-2">
          Executar Simulação
        </Button>
      </div>
    </div>
  )
}

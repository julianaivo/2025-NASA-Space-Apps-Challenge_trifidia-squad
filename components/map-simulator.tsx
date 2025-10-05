"use client"

import { useState } from "react"
import { MapView } from "@/components/map-view"
import { ImpactTimeline } from "@/components/impact-timeline"
import { Zap, Flame, Waves, Activity } from "lucide-react"
import { Card } from "@/components/ui/card"

export function MapSimulator() {
  const [messages, setMessages] = useState<Array<{ role: "user" | "assistant"; content: string }>>([
    {
      role: "assistant",
      content:
        "Olá! Clique no mapa para analisar diferentes localizações de impacto. Posso fornecer análises detalhadas sobre danos, população afetada e consequências.",
    },
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return

    setMessages([...messages, { role: "user", content: input }])

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Analisando coordenadas... A região selecionada possui densidade populacional de 2.847 hab/km². O impacto nesta localização resultaria em danos catastróficos em um raio de 180 km.",
        },
      ])
    }, 1000)

    setInput("")
  }

  return (
    <div className="h-full flex flex-col bg-background">
      <div className="p-6 border-b border-border">
        <h1 className="text-3xl font-mono font-bold text-primary tracking-wider">SIMULAÇÃO DE IMPACTO</h1>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          {/* Map Section */}
          <div className="flex-1 relative">
            <MapView />
          </div>

          <div className="border-t border-border">
            <ImpactTimeline />
          </div>
        </div>

        <div className="w-96 border-l border-border flex flex-col overflow-y-auto">
          {/* Parameters Panel */}
          <Card className="m-4 p-4 bg-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Parâmetros</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Diâmetro:</span>
                <span className="text-sm font-mono text-primary">10m</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Velocidade:</span>
                <span className="text-sm font-mono text-primary">11 km/s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Ângulo:</span>
                <span className="text-sm font-mono text-primary">15°</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Composição:</span>
                <span className="text-sm font-mono text-primary">Rochoso</span>
              </div>
            </div>
          </Card>

          {/* Estimated Effects Panel */}
          <Card className="m-4 mt-0 p-4 bg-card border-border">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-destructive" />
              <h3 className="text-lg font-semibold text-foreground">Efeitos Estimados</h3>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-chart-1" />
                  <span className="text-sm text-foreground">Cratera:</span>
                </div>
                <span className="text-sm font-mono text-primary">8m</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Flame className="w-3 h-3 text-chart-2" />
                  <span className="text-sm text-foreground">Bola de Fogo:</span>
                </div>
                <span className="text-sm font-mono text-primary">25m</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Waves className="w-3 h-3 text-chart-3" />
                  <span className="text-sm text-foreground">Onda de Choque:</span>
                </div>
                <span className="text-sm font-mono text-primary">80m</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-chart-4" />
                  <span className="text-sm text-foreground">Radiação Térmica:</span>
                </div>
                <span className="text-sm font-mono text-primary">120m</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Activity className="w-3 h-3 text-chart-5" />
                  <span className="text-sm text-foreground">Efeito Sísmico:</span>
                </div>
                <span className="text-sm font-mono text-primary">200m</span>
              </div>
            </div>
          </Card>

          {/* Legend Panel */}
          <Card className="m-4 mt-0 p-4 bg-card border-border">
            <h3 className="text-lg font-semibold text-foreground mb-4">Legenda</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full bg-chart-1 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-chart-1">Cratera / Bola de Fogo</div>
                  <div className="text-xs text-muted-foreground">Destruição total</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full bg-chart-3 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-chart-3">Onda de Choque</div>
                  <div className="text-xs text-muted-foreground">Danos estruturais severos</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full bg-chart-4 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-chart-4">Radiação Térmica</div>
                  <div className="text-xs text-muted-foreground">Queimaduras e incêndios</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-4 h-4 rounded-full bg-chart-5 mt-0.5 flex-shrink-0" />
                <div>
                  <div className="text-sm font-medium text-chart-5">Efeito Sísmico</div>
                  <div className="text-xs text-muted-foreground">Tremores e danos moderados</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

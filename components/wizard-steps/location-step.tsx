"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { MapView } from "@/components/map-view"
import type { SimulationConfig } from "@/components/simulator-wizard"
import { ChevronRight } from "lucide-react"

type LocationStepProps = {
  config: SimulationConfig
  setConfig: (config: SimulationConfig) => void
  onNext: () => void
  onBack: () => void
  isFirstStep: boolean
  isLastStep: boolean
}

export function LocationStep({ config, setConfig, onNext }: LocationStepProps) {
  const handleLocationSelect = (lat: number, lng: number) => {
    setConfig({
      ...config,
      location: { lat, lng },
    })
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Map:</h2>
        <p className="text-muted-foreground">Defina a região do planeta que será realizada a simulação</p>
      </div>

      <Card className="overflow-hidden border-2 border-primary/30">
        <div className="h-[500px]">
          <MapView onLocationSelect={handleLocationSelect} />
        </div>
      </Card>

      {config.location && (
        <div className="flex justify-end">
          <Button onClick={onNext} size="lg" className="gap-2">
            Próximo
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>
      )}
    </div>
  )
}

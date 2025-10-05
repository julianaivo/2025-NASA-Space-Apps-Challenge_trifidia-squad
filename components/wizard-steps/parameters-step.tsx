"use client"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { SimulationConfig } from "@/components/simulator-wizard"
import { ChevronLeft, ChevronRight } from "lucide-react"

type ParametersStepProps = {
  config: SimulationConfig
  setConfig: (config: SimulationConfig) => void
  onNext: () => void
  onBack: () => void
  isFirstStep: boolean
  isLastStep: boolean
}

export function ParametersStep({ config, setConfig, onNext, onBack }: ParametersStepProps) {
  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-foreground mb-2">Parameters:</h2>
        <p className="text-muted-foreground">Defina os parâmetros do asteroide e do impacto</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Projectile Parameters */}
        <Card className="p-6 border-2 border-primary/30">
          <h3 className="text-xl font-semibold text-primary mb-6">Projectile Parameters</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="diameter">Diameter</Label>
              <div className="flex gap-2">
                <Input
                  id="diameter"
                  type="number"
                  value={config.projectile.diameter}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      projectile: {
                        ...config.projectile,
                        diameter: Number(e.target.value),
                      },
                    })
                  }
                  className="flex-1"
                />
                <Select
                  value={config.projectile.diameterUnit}
                  onValueChange={(value) =>
                    setConfig({
                      ...config,
                      projectile: {
                        ...config.projectile,
                        diameterUnit: value,
                      },
                    })
                  }
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="m">m</SelectItem>
                    <SelectItem value="km">km</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="density">Density</Label>
              <div className="flex gap-2">
                <Input
                  id="density"
                  type="number"
                  value={config.projectile.density}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      projectile: {
                        ...config.projectile,
                        density: Number(e.target.value),
                      },
                    })
                  }
                  className="flex-1"
                />
                <Select
                  value={config.projectile.densityUnit}
                  onValueChange={(value) =>
                    setConfig({
                      ...config,
                      projectile: {
                        ...config.projectile,
                        densityUnit: value,
                      },
                    })
                  }
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg/m³">kg/m³</SelectItem>
                    <SelectItem value="g/cm³">g/cm³</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </Card>

        {/* Impact Parameters */}
        <Card className="p-6 border-2 border-primary/30">
          <h3 className="text-xl font-semibold text-primary mb-6">Impact Parameters</h3>
          <div className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>Angle:</Label>
                <span className="text-sm font-mono text-primary">{config.impact.angle}°</span>
              </div>
              <Slider
                value={[config.impact.angle]}
                onValueChange={([value]) =>
                  setConfig({
                    ...config,
                    impact: {
                      ...config.impact,
                      angle: value,
                    },
                  })
                }
                min={0}
                max={90}
                step={1}
                className="w-full"
              />
            </div>

            <div className="space-y-3">
              <div className="flex justify-between">
                <Label>Velocity:</Label>
                <span className="text-sm font-mono text-primary">{config.impact.velocity} km/s</span>
              </div>
              <Slider
                value={[config.impact.velocity]}
                onValueChange={([value]) =>
                  setConfig({
                    ...config,
                    impact: {
                      ...config.impact,
                      velocity: value,
                    },
                  })
                }
                min={11}
                max={72}
                step={1}
                className="w-full"
              />
            </div>
          </div>
        </Card>

        {/* Target Parameters */}
        <Card className="p-6 border-2 border-primary/30">
          <h3 className="text-xl font-semibold text-primary mb-6">Target Parameters</h3>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="target-type">Target Type</Label>
              <Select
                value={config.target.type}
                onValueChange={(value) =>
                  setConfig({
                    ...config,
                    target: {
                      ...config.target,
                      type: value,
                    },
                  })
                }
              >
                <SelectTrigger id="target-type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sedimentary Rock">Sedimentary Rock</SelectItem>
                  <SelectItem value="Hard Rock">Hard Rock</SelectItem>
                  <SelectItem value="Ice">Ice</SelectItem>
                  <SelectItem value="Water">Water</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="target-diameter">Diameter</Label>
              <div className="flex gap-2">
                <Input
                  id="target-diameter"
                  type="number"
                  value={config.target.diameter}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      target: {
                        ...config.target,
                        diameter: Number(e.target.value),
                      },
                    })
                  }
                  className="flex-1"
                />
                <Select
                  value={config.target.diameterUnit}
                  onValueChange={(value) =>
                    setConfig({
                      ...config,
                      target: {
                        ...config.target,
                        diameterUnit: value,
                      },
                    })
                  }
                >
                  <SelectTrigger className="w-24">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="m">m</SelectItem>
                    <SelectItem value="km">km</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div className="flex justify-between">
        <Button onClick={onBack} variant="outline" size="lg" className="gap-2 bg-transparent">
          <ChevronLeft className="w-5 h-5" />
          Voltar
        </Button>
        <Button onClick={onNext} size="lg" className="gap-2">
          Próximo
          <ChevronRight className="w-5 h-5" />
        </Button>
      </div>
    </div>
  )
}

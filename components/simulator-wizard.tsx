"use client"

import { useState } from "react"
import { MapPin, BarChart3, CheckCircle2 } from "lucide-react"
import { LocationStep } from "@/components/wizard-steps/location-step"
import { ParametersStep } from "@/components/wizard-steps/parameters-step"
import { SummaryStep } from "@/components/wizard-steps/summary-step"

export type SimulationConfig = {
  location: {
    lat: number
    lng: number
    address?: string
  } | null
  projectile: {
    diameter: number
    diameterUnit: string
    density: number
    densityUnit: string
  }
  impact: {
    angle: number
    velocity: number
  }
  target: {
    type: string
    diameter: number
    diameterUnit: string
  }
}

export function SimulatorWizard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [config, setConfig] = useState<SimulationConfig>({
    location: null,
    projectile: {
      diameter: 100,
      diameterUnit: "m",
      density: 3000,
      densityUnit: "kg/m³",
    },
    impact: {
      angle: 45,
      velocity: 20,
    },
    target: {
      type: "Sedimentary Rock",
      diameter: 0,
      diameterUnit: "m",
    },
  })

  const steps = [
    {
      id: 0,
      title: "Localização",
      icon: MapPin,
      component: LocationStep,
    },
    {
      id: 1,
      title: "Parâmetros",
      icon: BarChart3,
      component: ParametersStep,
    },
    {
      id: 2,
      title: "Resumo",
      icon: CheckCircle2,
      component: SummaryStep,
    },
  ]

  const CurrentStepComponent = steps[currentStep].component

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="p-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-mono font-bold text-center mb-8">
            <span className="text-foreground">Asteroid </span>
            <span className="text-primary">IMPACT</span>
            <div className="text-2xl text-foreground mt-1">Simulator</div>
          </h1>

          {/* Progress Stepper */}
          <div className="flex items-center justify-center gap-4">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = index === currentStep
              const isCompleted = index < currentStep

              return (
                <div key={step.id} className="flex items-center">
                  <div className="flex flex-col items-center gap-2">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center border-2 transition-all ${
                        isActive
                          ? "bg-primary border-primary"
                          : isCompleted
                            ? "bg-primary/20 border-primary"
                            : "bg-card border-border"
                      }`}
                    >
                      <Icon
                        className={`w-8 h-8 ${isActive || isCompleted ? "text-primary" : "text-muted-foreground"}`}
                      />
                    </div>
                    <span
                      className={`text-sm font-medium ${
                        isActive || isCompleted ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {step.title}
                    </span>
                  </div>

                  {index < steps.length - 1 && (
                    <div className={`w-24 h-0.5 mx-4 ${isCompleted ? "bg-primary" : "bg-border"}`} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Step Content */}
      <div className="flex-1 overflow-auto">
        <CurrentStepComponent
          config={config}
          setConfig={setConfig}
          onNext={() => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))}
          onBack={() => setCurrentStep((prev) => Math.max(prev - 1, 0))}
          isFirstStep={currentStep === 0}
          isLastStep={currentStep === steps.length - 1}
        />
      </div>
    </div>
  )
}

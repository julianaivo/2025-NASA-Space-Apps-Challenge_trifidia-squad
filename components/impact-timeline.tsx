"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Clock, ChevronRight } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface TimelineEvent {
  time: string
  title: string
  description: string
  details: string
}

const timelineEvents: TimelineEvent[] = [
  {
    time: "T-10s",
    title: "Entrada na Atmosfera",
    description: "O asteroide entra na atmosfera terrestre",
    details:
      "O asteroide penetra a atmosfera terrestre a uma velocidade extrema, criando uma onda de choque supersônica e aquecimento intenso devido ao atrito com o ar.",
  },
  {
    time: "T-5s",
    title: "Fragmentação Atmosférica",
    description: "Pressão atmosférica causa fragmentação",
    details:
      "A pressão atmosférica e o aquecimento extremo causam a fragmentação do asteroide em múltiplos pedaços, aumentando a área de impacto potencial.",
  },
  {
    time: "T-0s",
    title: "Impacto",
    description: "Colisão com a superfície terrestre",
    details:
      "O asteroide colide com a superfície terrestre, liberando uma quantidade massiva de energia equivalente a milhares de toneladas de TNT.",
  },
  {
    time: "T+0.1s",
    title: "Bola de Fogo",
    description: "Formação da bola de fogo inicial",
    details:
      "Uma bola de fogo massiva se forma instantaneamente no ponto de impacto, vaporizando tudo em um raio de vários quilômetros.",
  },
  {
    time: "T+1s",
    title: "Onda de Choque",
    description: "Propagação da onda de choque supersônica",
    details:
      "Uma onda de choque supersônica se propaga do epicentro, causando destruição massiva de estruturas e danos severos em um raio extenso.",
  },
  {
    time: "T+10s",
    title: "Ejeção de Material",
    description: "Material é ejetado da cratera",
    details:
      "Grandes quantidades de material rochoso e detritos são ejetados da cratera formada, criando projéteis secundários que causam danos adicionais.",
  },
  {
    time: "T+1min",
    title: "Radiação Térmica",
    description: "Pulso de radiação térmica intensa",
    details:
      "Um pulso intenso de radiação térmica se propaga, causando queimaduras severas e iniciando incêndios em massa em um raio de centenas de quilômetros.",
  },
  {
    time: "T+10min",
    title: "Efeitos Sísmicos",
    description: "Ondas sísmicas se propagam pelo solo",
    details:
      "O impacto gera ondas sísmicas equivalentes a um terremoto de grande magnitude, que podem ser detectadas em todo o planeta. Estruturas podem sofrer danos estruturais a centenas de quilômetros.",
  },
]

export function ImpactTimeline() {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)

  return (
    <>
      <div className="p-4 bg-card">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Linha do Tempo do Impacto</h3>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {timelineEvents.map((event, index) => (
            <Card
              key={index}
              className="p-3 bg-secondary border-border hover:border-primary cursor-pointer transition-colors group"
              onClick={() => setSelectedEvent(event)}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-mono text-primary mb-1">{event.time}</div>
                    <div className="text-sm font-medium text-foreground truncate">{event.title}</div>
                    <div className="text-xs text-muted-foreground line-clamp-1">{event.description}</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary flex-shrink-0" />
              </div>
            </Card>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-foreground">
              <span className="text-primary font-mono mr-2">{selectedEvent?.time}</span>
              {selectedEvent?.title}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground pt-4">{selectedEvent?.details}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  )
}

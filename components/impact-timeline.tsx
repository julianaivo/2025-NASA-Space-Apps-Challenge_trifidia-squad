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

interface ImpactTimelineProps {
  animationPhase?: number
}

export function ImpactTimeline({ animationPhase = 0 }: ImpactTimelineProps) {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)
  
  // Determinar qual evento está ativo baseado na fase da animação
  const getActiveEventIndex = (phase: number): number => {
    if (phase < 10) return -1; // Nenhum evento ainda
    if (phase < 25) return 0;  // Entrada na atmosfera
    if (phase < 50) return 1;  // Fragmentação
    if (phase < 60) return 2;  // Impacto
    if (phase < 80) return 3;  // Bola de fogo
    if (phase < 95) return 4;  // Onda de choque
    return 5; // Efeitos secundários
  };
  
  const activeIndex = getActiveEventIndex(animationPhase);

  return (
    <>
      <div className="p-4 bg-card">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Linha do Tempo do Impacto</h3>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {timelineEvents.map((event, index) => {
            const isActive = index === activeIndex;
            const isCompleted = index < activeIndex;
            const isPending = index > activeIndex;
            
            return (
              <Card
                key={index}
                className={`p-3 cursor-pointer transition-all duration-300 group ${
                  isActive 
                    ? 'bg-primary/20 border-primary shadow-lg' 
                    : isCompleted 
                      ? 'bg-green-500/10 border-green-500/50' 
                      : 'bg-secondary border-border hover:border-muted-foreground'
                }`}
                onClick={() => setSelectedEvent(event)}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center ${
                      isActive 
                        ? 'bg-primary animate-pulse' 
                        : isCompleted 
                          ? 'bg-green-500' 
                          : 'bg-muted'
                    }`}>
                      {isCompleted && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                      {isActive && (
                        <div className="w-2 h-2 bg-white rounded-full animate-ping" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-mono mb-1 ${
                        isActive ? 'text-primary font-bold' : 
                        isCompleted ? 'text-green-400' : 'text-muted-foreground'
                      }`}>
                        {event.time}
                      </div>
                      <div className={`text-sm font-medium truncate ${
                        isActive ? 'text-foreground font-semibold' : 
                        isCompleted ? 'text-foreground' : 'text-muted-foreground'
                      }`}>
                        {event.title}
                      </div>
                      <div className="text-xs text-muted-foreground line-clamp-1">
                        {event.description}
                      </div>
                    </div>
                  </div>
                  <ChevronRight className={`w-4 h-4 flex-shrink-0 transition-colors ${
                    isActive ? 'text-primary' : 'text-muted-foreground group-hover:text-primary'
                  }`} />
                </div>
              </Card>
            );
          })}
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

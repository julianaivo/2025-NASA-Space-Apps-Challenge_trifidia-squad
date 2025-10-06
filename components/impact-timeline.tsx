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
    title: "Atmospheric Entry",
    description: "Asteroid enters Earth's atmosphere",
    details:
      "The asteroid penetrates Earth's atmosphere at extreme velocity, creating a supersonic shockwave and intense heating due to air friction.",
  },
  {
    time: "T-5s",
    title: "Atmospheric Fragmentation",
    description: "Atmospheric pressure causes fragmentation",
    details:
      "Atmospheric pressure and extreme heating cause the asteroid to fragment into multiple pieces, increasing the potential impact area.",
  },
  {
    time: "T-0s",
    title: "Impact",
    description: "Collision with Earth's surface",
    details:
      "The asteroid collides with Earth's surface, releasing a massive amount of energy equivalent to thousands of tons of TNT.",
  },
  {
    time: "T+0.1s",
    title: "Fireball",
    description: "Formation of initial fireball",
    details:
      "A massive fireball forms instantly at the impact point, vaporizing everything within a radius of several kilometers.",
  },
  {
    time: "T+1s",
    title: "Shockwave",
    description: "Supersonic shockwave propagation",
    details:
      "A supersonic shockwave propagates from the epicenter, causing massive destruction of structures and severe damage over an extensive radius.",
  },
  {
    time: "T+10s",
    title: "Material Ejection",
    description: "Material is ejected from the crater",
    details:
      "Large amounts of rocky material and debris are ejected from the formed crater, creating secondary projectiles that cause additional damage.",
  },
  {
    time: "T+1min",
    title: "Thermal Radiation",
    description: "Intense thermal radiation pulse",
    details:
      "An intense pulse of thermal radiation propagates, causing severe burns and initiating mass fires within a radius of hundreds of kilometers.",
  },
  {
    time: "T+10min",
    title: "Seismic Effects",
    description: "Seismic waves propagate through the ground",
    details:
      "The impact generates seismic waves equivalent to a major earthquake, which can be detected across the entire planet. Structures may suffer structural damage hundreds of kilometers away.",
  },
]

interface ImpactTimelineProps {
  animationPhase?: number
}

export function ImpactTimeline({ animationPhase = 0 }: ImpactTimelineProps) {
  const [selectedEvent, setSelectedEvent] = useState<TimelineEvent | null>(null)
  
  // Determine which event is active based on animation phase
  const getActiveEventIndex = (phase: number): number => {
    if (phase < 10) return -1; // No event yet
    if (phase < 25) return 0;  // Atmospheric entry
    if (phase < 50) return 1;  // Fragmentation
    if (phase < 60) return 2;  // Impact
    if (phase < 80) return 3;  // Fireball
    if (phase < 95) return 4;  // Shockwave
    return 5; // Secondary effects
  };
  
  const activeIndex = getActiveEventIndex(animationPhase);

  return (
    <>
      <div className="p-4 bg-card">
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5 text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Impact Timeline</h3>
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

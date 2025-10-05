import { Brain, Network, Target } from "lucide-react"

const features = [
  {
    icon: Brain,
    title: "Continuous learning",
    description: "Astro.IA learns from new observations and scientific updates, refining its predictions with each new piece of data.",
  },
  {
    icon: Network,
    title: "Integrated analytics",
    description: "It combines orbital, topographic, and atmospheric variables to predict not only the point of impact, but also secondary effects such as earthquakes and tsunamis.",
  },
  {
    icon: Target,
    title: "Decision support",
    description: "It offers insights that help scientists, managers, and institutions act preventively, guiding risk mitigation and communication policies.",
  },
]

export function AstroIASection() {
  return (
    <section className="relative flex flex-col justify-center items-start w-full min-h-screen px-70">
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold text-primary">AstroIA</h2>
          <p className="text-sm text-muted-foreground">Planetary Security Artificial Intelligence</p>
        </div>

        <div className="space-y-4 max-w-3xl mx-auto">
          <h3 className="text-3xl md:text-4xl font-bold leading-tight text-balance">
            Intelligent model to predict impacts and understand risks in real time
          </h3>
        </div>

        <div className="grid md:grid-cols-3 gap-6 pt-8 max-w-5xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-4 p-6 rounded-lg bg-card/50 border border-primary/20"
            >
              <div className="w-14 h-14 rounded-lg bg-primary/20 flex items-center justify-center">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <div className="text-center space-y-2">
                <h4 className="font-semibold text-lg text-foreground">{feature.title}</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

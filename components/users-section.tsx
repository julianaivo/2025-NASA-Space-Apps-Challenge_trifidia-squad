import { Telescope, Shield, GraduationCap, Microscope } from "lucide-react"
import Image from "next/image"

const userTypes = [
  {
    icon: Telescope,
    title: "Entusiasta",
    description: "Explore o espaço",
  },
  {
    icon: Shield,
    title: "Defesa Civil",
    description: "Planeje respostas",
  },
  {
    icon: GraduationCap,
    title: "Estudante",
    description: "Aprenda sobre asteroides",
  },
  {
    icon: Microscope,
    title: "Cientista",
    description: "Analise dados reais",
  },
]

export function UsersSection() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-20">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-balance">
            Da pesquisa científica à curiosidade individual.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            O AstroView foi criado para diferentes objetivos que compartilham um mesmo objetivo: compreender os riscos
            espaciais e agir de forma preventiva e educativa.
          </p>

          <div className="grid grid-cols-2 gap-4 pt-4">
            {userTypes.map((user, index) => (
              <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-card/50 border border-primary/20">
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                  <user.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{user.title}</h3>
                  <p className="text-sm text-muted-foreground">{user.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="relative h-[400px] md:h-[500px]">
          <Image src="/realistic-earth-from-space-showing-continents-and-.jpg" alt="Earth" fill className="object-contain" />
        </div>
      </div>
    </section>
  )
}

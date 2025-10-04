import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="container mx-auto px-4 py-12 md:py-20">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-0.5">
            <div className="h-0.5 w-8 bg-primary rounded"></div>
            <div className="h-0.5 w-6 bg-primary rounded"></div>
            <div className="h-0.5 w-4 bg-primary rounded"></div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">Astroview</h1>
        </div>
        <span className="text-sm text-muted-foreground">Camada_1</span>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
            Plataforma de visualização e simulação de riscos de asteroides.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            Transforme dados da NASA e do IBGE em simulações interativas que ajudam a entender, comunicar e mitigar os
            riscos de impactos de asteroides.
          </p>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-6 text-lg font-semibold rounded-md">
            Entrar
          </Button>
        </div>

        <div className="relative h-[400px] md:h-[500px]">
          <Image src="/realistic-3d-asteroid-with-rough-rocky-surface.jpg" alt="Asteroid" fill className="object-contain" priority />
        </div>
      </div>
    </section>
  )
}

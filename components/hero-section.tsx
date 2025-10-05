import { Button } from "@/components/ui/button"
import Image from "next/image"

export function HeroSection() {
  return (
    <section className="relative flex flex-col justify-center items-start w-full min-h-screen px-40">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <div className="flex flex-col gap-0.5">
            <div className="h-0.5 w-8 bg-primary rounded"></div>
            <div className="h-0.5 w-6 bg-primary rounded"></div>
            <div className="h-0.5 w-4 bg-primary rounded"></div>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-primary">Astroview</h1>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
            Platform for visualization and simulation of asteroid risks.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            It transforms NASA and USGS data into interactive simulations that help understand, communicate, and mitigate potential impacts on Earth.
          </p>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-6 text-lg font-semibold rounded-md">
            Get Started
          </Button>
        </div>

        <div className="absolute right-[-420px] top-[-62px] mix-blend-screen brightness-125 opacity-95 pointer-events-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-[1200px] h-auto object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]"
          >
            <source src="/ASTEROIDE.mov" type="video/quicktime" />
            <source src="/ASTEROIDE.webm" type="video/webm" />
          </video>
        </div>

      </div>
    </section>
  )
}

//<Image src="/" alt="Ícone de exemplo" width={50} height={50}/>
//proporcao
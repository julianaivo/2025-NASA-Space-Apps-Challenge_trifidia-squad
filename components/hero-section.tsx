import { Button } from "@/components/ui/button"
import Image from "next/image"


export function HeroSection() {
  return (
    <section className="relative flex flex-col justify-center items-start w-full min-h-screen px-40">

      <div className="flex items-center mb-4">
        <div className="space-y-4" >
          <Image
            src="/astroview-logo.png"
            alt="Astroview Logo"
            width={300}
            height={100}
            className="object-contain"
            priority
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance">
            Platform for visualization and simulation of steroid risks.
          </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            It transforms NASA and USGS data into interactive simulations that help understand, communicate, and mitigate potential impacts on Earth.
          </p>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-12 py-6 text-lg font-semibold rounded-md hover:scale-[1.05] transition-all duration-300">
            Sign in
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
import { HeroSection } from "@/components/hero-section"
import { UsersSection } from "@/components/users-section"
import { AstroIASection } from "@/components/astroia-section"
import { Starfield } from "@/components/starfield"

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Starfield />
      <div className="relative z-10">
        <HeroSection />
        <UsersSection />
        <AstroIASection />
      </div>
    </main>
  )
}

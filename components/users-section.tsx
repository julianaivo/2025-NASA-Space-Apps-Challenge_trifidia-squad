import { Telescope, Shield, GraduationCap, Microscope } from "lucide-react"
import Image from "next/image"

const userTypes = [
  {
    icon: Telescope,
    title: "Enthusiast",
    description: "For those curious and passionate about astronomy.",
  },
  {
    icon: Shield,
    title: "Civil Defense",
    description: "For public administrators.",
  },
  {
    icon: GraduationCap,
    title: "Student",
    description: "For those seeking a solid foundation.",
  },
  {
    icon: Microscope,
    title: "Researcher",
    description: "For scientists and astronomical data professionals.",
  },
]

export function UsersSection() {
  return (
    <section className="relative flex flex-col justify-center items-start w-full min-h-screen px-40">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight text-balance">
            From scientific research to individual curiosity.
            </h2>
          <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
            AstroView was created for different audiences who share the same goal: to understand space risks and act preventively and educationally.
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


        <div className="absolute right-[-360px] bottom-[-40px] mix-blend-screen brightness-125 opacity-95 pointer-events-none">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-[1000px] h-auto object-contain drop-shadow-[0_0_30px_rgba(255,255,255,0.15)]"
          >
            <source src="/TERRA.mov" type="video/quicktime" />
            <source src="/TERRA.webm" type="video/webm" />
          </video>
        </div>

      </div>
    </section>
  )
}

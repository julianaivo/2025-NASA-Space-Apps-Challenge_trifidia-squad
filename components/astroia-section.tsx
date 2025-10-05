import Image from "next/image";

const userTypes = [
  {
    icon: "/icons/aprendizado.png",
    title: "Continuous learning",
    description:
      "Astro.AI learns from new observations and scientific updates, refining its predictions with each new piece of data.",
  },
  {
    icon: "/icons/analise.png",
    title: "Integrated analytics",
    description:
      "It combines orbital, topographic, and atmospheric variables to predict not only the point of impact, but also secondary effects such as earthquakes and tsunamis.",
  },
  {
    icon: "/icons/decisao.png",
    title: "Decision support",
    description:
      "It offers insights that help scientists, managers, and institutions act preventively, guiding risk mitigation and communication policies.",
  },
];

export function AstroIASection() {
  return (
    <section className="relative flex flex-col justify-center items-center w-full min-h-screen px-8 py-16">
      <div className="flex flex-col items-center justify-center space-y-6">
        <div className="space-y-4" >
          <Image
            src="/astro.ai-logo.png"
            alt="Astro.AI Logo"
            width={600}
            height={150}
            className="object-contain"
            priority
          />
        </div>

        <div className="space-y-4">
          <h3 className="text-3xl md:text-4xl font-bold leading-tight text-balance">
            Intelligent model to predict impacts and understand risks in real time
          </h3>
        </div>
      </div>

      {/* Cards abaixo do texto */}
      <div className="grid md:grid-cols-3 gap-8 pt-16 max-w-6xl mx-auto">
        {userTypes.map((type, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center p-6 rounded-2xl shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="w-20 h-20 mb-4">
              <Image
                src={type.icon}
                alt={type.title}
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
            <h4 className="font-semibold text-xl text-foreground mb-2">
              {type.title}
            </h4>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {type.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}


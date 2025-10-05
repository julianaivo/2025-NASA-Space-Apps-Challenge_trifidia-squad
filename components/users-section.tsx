import Image from "next/image";

const userTypes = [
  {
    icon: "/icons/entusiasta.png",
    title: "Enthusiast",
    description: "Para curiosos e apaixonados por astronomia.",
    
  },
  {
    icon: "/icons/defesa.png",
    title: "Civil Defense",
    description: "Para gestores públicos e profissionais de emergência.",
  },
  {
    icon: "/icons/estudante.png",
    title: "Student",
    description: "Para quem busca aprender mais sobre o universo.",
  },
  {
    icon: "/icons/cientista.png",
    title: "Researcher",
    description: "Para pesquisadores e profissionais da área astronômica.",
  },
];

export function UsersSection() {
  return (
    <section className="relative flex flex-col justify-center items-start w-full min-h-screen px-8 md:px-40 py-20">
      <div className="max-w-3xl">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight text-balance text-white">
            From scientific research to individual curiosity.
        </h2>
        <p className="text-base md:text-lg text-gray-300 leading-relaxed mt-4">
          AstroView was created for different audiences who share the same goal: <br /> to understand space risks and act preventively and educationally.
        </p>


        {/* GRID DOS CARDS  */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-10">
          {userTypes.map((user, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-xl p-5 hover:scale-[1.05] transition-all duration-300"
            >
              <div className="flex-shrink-0">
                <Image
                  src={user.icon}
                  alt={user.title}
                  width={20}
                  height={20}
                  className="w-10 h-10"
                />
              </div>
              <div>
                <h3 className="text-white font-semibold text-lg">{user.title}</h3>
                <p className="text-sm text-gray-300">{user.description}</p>
              </div>
            </div>
          ))}

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
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";

const VALUES = [
  {
    icon: "◆",
    title: "Academic Excellence",
    desc: "Rigorous bilingual curriculum benchmarked against international standards, designed to challenge and inspire.",
  },
  {
    icon: "◈",
    title: "Bilingual Identity",
    desc: "Immersive dual-language learning that opens doors to global opportunities while honouring cultural roots.",
  },
  {
    icon: "◉",
    title: "Holistic Growth",
    desc: "Sports, arts, and character development woven alongside academic learning at every stage.",
  },
  {
    icon: "◇",
    title: "Inclusive Community",
    desc: "A welcoming environment where every child belongs, is seen, and has the chance to thrive.",
  },
];

export default function AboutSection() {
  return (
    <section className="section-wrapper bg-white">
      <div className="container-xl">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div>
            <span className="section-label">About the School</span>
            <h2 className="mt-3 section-heading">
              More than a school,
              <br />a movement.
            </h2>
            <p className="mt-6 text-slate-500 text-lg leading-relaxed">
              Founded in 2010, Mandela Bilingual Nursery and Primary was built
              on the belief that every child deserves access to world-class
              bilingual education. We blend internationally recognised
              pedagogies with immersive language learning from the earliest
              years.
            </p>
            <p className="mt-4 text-slate-700 leading-relaxed">
              Our campus serves over 750 students, each one supported by
              dedicated staff and a transformational bilingual ethos that
              prepares them for a connected world.
            </p>
            <Link
              to="/about"
              className="link-arrow text-accent mt-8 group block"
            >
              Learn Our Story{" "}
              <span className="ml-2 group-hover:ml-4 transition-all duration-200">
                →
              </span>
            </Link>
          </div>

          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {VALUES.map(({ icon, title, desc }) => (
                <div
                  key={title}
                  className="p-5 bg-school-off-white hover:bg-primary-50 transition-colors duration-300 rounded-xl shadow-sm"
                >
                  <span className="text-xl text-accent">{icon}</span>
                  <h3 className="mt-3 font-bold text-school-black text-sm">
                    {title}
                  </h3>
                  <p className="mt-1.5 text-slate-700 text-xs leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

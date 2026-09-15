import { Link } from "react-router-dom";

const PROGRAMMES = [
  {
    level: "Early Years",
    ages: "Ages 3–5",
    desc: "Play-based learning that builds curiosity, language, and social skills through structured exploration in a nurturing environment.",
    subjects: [
      "Literacy Foundations",
      "Numeracy Play",
      "Creative Arts",
      "Physical Development",
    ],
  },
  {
    level: "Lower Primary",
    ages: "Ages 6–8",
    desc: "Core academics introduced through inquiry-led teaching that connects classroom learning to real-world experiences and discovery.",
    subjects: [
      "English & Literacy",
      "Mathematics",
      "Science Discovery",
      "Cultural Studies",
    ],
  },
  {
    level: "Upper Primary",
    ages: "Ages 9–12",
    desc: "Advanced curriculum preparing students for secondary school, with critical thinking, leadership, and digital skills at its core.",
    subjects: [
      "Advanced Mathematics",
      "STEM Projects",
      "Modern Languages",
      "Leadership & Ethics",
    ],
  },
];

export default function AcademicsSection() {
  return (
    <section className="section-wrapper bg-white">
      <div className="container-xl">
        <div className="grid lg:grid-cols-5 gap-16 items-start">
          <div className="lg:col-span-2">
            <span className="section-label">Curriculum</span>
            <h2 className="mt-3 section-heading">
              Learning
              <br />
              designed
              <br />
              to last.
            </h2>
            <p className="mt-6 text-slate-500 leading-relaxed">
              Our curriculum is benchmarked against international standards and
              adapted for the African context, globally competitive, culturally
              grounded.
            </p>
            <div className="mt-8 p-6 bg-primary text-white rounded-xl shadow-sm">
              <p className="font-bold text-base">Cambridge Primary Framework</p>
              <p className="text-white/80 text-sm mt-1 leading-relaxed">
                Aligned with Cambridge International, enhanced with African
                Studies and local language immersion programmes.
              </p>
            </div>
            <Link
              to="/academics"
              className="link-arrow text-accent mt-8 group block"
            >
              Explore Curriculum{" "}
              <span className="ml-2 group-hover:ml-4 transition-all duration-200">
                →
              </span>
            </Link>
          </div>

          <div className="lg:col-span-3 space-y-4">
            {PROGRAMMES.map((prog, i) => (
              <div
                key={prog.level}
                className="border border-gray-100 p-6 hover:border-primary transition-colors duration-300 group rounded-xl"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-xs text-slate-700 font-bold uppercase tracking-widest">
                      Stage {i + 1}
                    </span>
                    <h3 className="font-bold text-xl text-school-black mt-1">
                      {prog.level}
                    </h3>
                    <p className="text-accent text-sm font-semibold">
                      {prog.ages}
                    </p>
                  </div>
                  <span className="text-gray-100 group-hover:text-accent text-4xl font-bold transition-colors select-none">
                    0{i + 1}
                  </span>
                </div>
                <p className="mt-3 text-slate-500 text-sm leading-relaxed">
                  {prog.desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {prog.subjects.map((s) => (
                    <span
                      key={s}
                      className="px-3 py-1 bg-school-off-white text-slate-500 text-xs font-medium rounded-md"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

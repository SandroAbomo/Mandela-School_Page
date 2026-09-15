import { Link } from "react-router-dom";
import { SCHOOL_IMAGE_SRC } from "../../assets";

const STATS = [
  { value: "750+", label: "Students" },
  { value: "95%", label: "Parent Satisfaction" },
  { value: "15+", label: "Years of Excellence" },
  { value: "2", label: "Languages" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* School image background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${SCHOOL_IMAGE_SRC}')` }}
      />
      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-school-black/75" />
      {/* Gradient accents */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 80% 110%, rgba(127,154,168,0.18) 0%, transparent 70%), radial-gradient(ellipse 40% 50% at 10% -10%, rgba(127,154,168,0.10) 0%, transparent 60%)",
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 pb-24 lg:pt-44 lg:pb-32">
        <div className="max-w-4xl text-center sm:text-left">
          <span className="inline-block text-xs font-bold uppercase tracking-[0.25em] text-white/50 mb-6">
            Est. 2010 · Bilingual Excellence
          </span>
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold text-white tracking-tight leading-[0.92] mb-8">
            Education
            <br />
            <span className="text-accent">That</span>
            <br />
            Transforms
          </h1>
          <p className="text-white/70 text-lg lg:text-xl max-w-xl leading-relaxed mb-10 mx-auto sm:mx-0">
            Mandela Bilingual Nursery and Primary, one campus, one mission.
            Shaping confident, curious, and compassionate bilingual learners for
            a changing world.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
            <Link to="/admissions" className="btn-primary">
              Apply for 2026–2027 Entry
            </Link>
            <Link to="/about" className="btn-outline-white">
              Discover Our Story
            </Link>
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-white/10 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center lg:text-left">
          {STATS.map(({ value, label }) => (
            <div key={label}>
              <p className="text-4xl lg:text-5xl font-bold text-white">
                {value}
              </p>
              <p className="text-white/50 text-sm mt-1">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

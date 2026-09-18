import { Link } from "react-router-dom";
import { CAMPUS_AERIAL_ALT, CAMPUS_AERIAL_SRC } from "../../assets";

const CAMPUS = {
  name: "Main Campus",
  location: "15 Mandela Drive, Central District",
  intro:
    "Nursery through Class 7 all learn on one site, so every child is known by name and every family has a single front gate, a single team, and one set of standards.",
  stats: [
    { value: "750", label: "Students" },
    { value: "2010", label: "Founded" },
    { value: "2", label: "Languages" },
  ],
  features: [
    "Main administration",
    "Science laboratories",
    "Bilingual learning suites",
    "Performing arts theatre",
  ],
};

function CheckIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="currentColor"
      aria-hidden="true"
      className="w-4 h-4 mt-0.5 flex-shrink-0 text-accent"
    >
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 0 1 0 1.4l-7.5 7.5a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4l3.3 3.29 6.8-6.79a1 1 0 0 1 1.4 0Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function CampusesSection() {
  return (
    <section className="section-wrapper bg-school-off-white">
      <div className="container-xl">
        <div className="max-w-2xl mx-auto text-center mb-12 lg:mb-16">
          <span className="section-label">Our Location</span>
          <h2 className="mt-3 section-heading">One campus, one family.</h2>
          <p className="mt-5 text-slate-600 leading-relaxed">{CAMPUS.intro}</p>
        </div>

        <div className="group grid lg:grid-cols-5 bg-school-black rounded-2xl overflow-hidden shadow-xl">
          {/* Campus photograph */}
          <div className="relative lg:col-span-3 h-64 sm:h-80 lg:h-auto lg:min-h-[30rem] overflow-hidden">
            <img
              src={CAMPUS_AERIAL_SRC}
              alt={CAMPUS_AERIAL_ALT}
              width="1547"
              height="1017"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-school-black/80 via-school-black/20 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-school-black/10 lg:to-school-black"
              aria-hidden="true"
            />
            <span className="absolute bottom-6 left-6 sm:bottom-8 sm:left-8 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              Nursery – Class 7
            </span>
          </div>

          {/* Campus detail */}
          <div className="lg:col-span-2 flex flex-col p-8 sm:p-10 lg:p-12">
            <span className="text-xs font-bold uppercase tracking-widest text-white/40">
              Campus
            </span>
            <h3 className="mt-2 text-3xl font-bold text-white tracking-tight">
              {CAMPUS.name}
            </h3>
            <p className="mt-2 text-sm text-white/60">{CAMPUS.location}</p>

            <dl className="mt-8 grid grid-cols-3 gap-px overflow-hidden rounded-xl bg-white/10">
              {CAMPUS.stats.map(({ value, label }) => (
                <div key={label} className="bg-school-black px-2 py-4 text-center">
                  <dt className="sr-only">{label}</dt>
                  <dd>
                    <p className="text-2xl font-bold text-white">{value}</p>
                    <p className="mt-0.5 text-[0.7rem] uppercase tracking-wide text-white/40">
                      {label}
                    </p>
                  </dd>
                </div>
              ))}
            </dl>

            <ul className="mt-8 space-y-3">
              {CAMPUS.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-3 text-sm text-white/75"
                >
                  <CheckIcon />
                  {feature}
                </li>
              ))}
            </ul>

            <div className="mt-10 lg:mt-auto lg:pt-10 flex flex-wrap items-center gap-x-8 gap-y-4">
              <Link to="/campuses" className="link-arrow group/link text-accent">
                Explore the campus
                <span
                  aria-hidden="true"
                  className="ml-2 transition-transform duration-200 group-hover/link:translate-x-1"
                >
                  →
                </span>
              </Link>
              <Link
                to="/contact"
                className="text-sm font-semibold uppercase tracking-wide text-white/60 underline-offset-4 transition-colors hover:text-white hover:underline"
              >
                Arrange a visit
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

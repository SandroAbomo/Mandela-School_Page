import { Link } from "react-router-dom";

const CATEGORIES = [
  {
    name: "Sports & Athletics",
    icon: "⬡",
    colour: "bg-primary",
    items: [
      {
        name: "Football",
        campuses: ["Central", "North", "East"],
        desc: "Competitive inter-campus teams from Year 2 upwards. Annual championship held each spring term.",
      },
      {
        name: "Swimming",
        campuses: ["Central"],
        desc: "Weekly lessons for all students at Central Campus pool, with squad training for competitive swimmers.",
      },
      {
        name: "Athletics",
        campuses: ["Central", "North", "East"],
        desc: "Track and field across all campuses. Students compete in the annual inter-campus athletics day.",
      },
      {
        name: "Basketball",
        campuses: ["North", "East"],
        desc: "After-school club with inter-school fixtures from Year 4.",
      },
    ],
  },
  {
    name: "Performing Arts",
    icon: "⬢",
    colour: "bg-school-black",
    items: [
      {
        name: "School Choir",
        campuses: ["Central", "North", "East"],
        desc: "Three campus choirs that come together for the annual joint performance. Open to all year groups.",
      },
      {
        name: "Drama Club",
        campuses: ["Central", "East"],
        desc: "Term-time rehearsals culminating in a full stage production for parents and the community.",
      },
      {
        name: "Dance & Movement",
        campuses: ["Central", "North", "East"],
        desc: "African dance, contemporary, and creative movement performed at Cultural Day and assemblies.",
      },
      {
        name: "Music Tuition",
        campuses: ["Central", "North"],
        desc: "Individual tuition in piano, guitar, drums, and traditional African instruments.",
      },
    ],
  },
  {
    name: "STEM & Technology",
    icon: "⬠",
    colour: "bg-school-black",
    items: [
      {
        name: "Coding Club",
        campuses: ["North", "East"],
        desc: "Weekly sessions using Scratch, Python, and block coding. Students build apps and games each term.",
      },
      {
        name: "Robotics",
        campuses: ["North", "East"],
        desc: "Design, build, and program robots. Teams compete in the national Junior Robotics Challenge.",
      },
      {
        name: "Science Explorers",
        campuses: ["Central", "North", "East"],
        desc: "Hands-on science experiments beyond the classroom curriculum.",
      },
      {
        name: "Eco & Green Club",
        campuses: ["North"],
        desc: "Environmental awareness, gardening, composting, and sustainability projects.",
      },
    ],
  },
  {
    name: "Culture & Leadership",
    icon: "◈",
    colour: "bg-primary",
    items: [
      {
        name: "Student Council",
        campuses: ["Central", "North", "East"],
        desc: "Elected student representatives from Year 3 upwards, meeting monthly to voice ideas.",
      },
      {
        name: "Debate Club",
        campuses: ["Central", "North"],
        desc: "Structured debating sessions with inter-school competitions from Year 5.",
      },
      {
        name: "Cultural Arts",
        campuses: ["Central", "North", "East"],
        desc: "African art, batik, beading, and textile arts taught by specialist cultural educators.",
      },
      {
        name: "Community Service",
        campuses: ["Central", "North", "East"],
        desc: "Regular community outreach days, charity drives, and volunteering initiatives.",
      },
    ],
  },
];

export default function Activities() {
  return (
    <>
      <section className="bg-school-black pt-36 pb-20 lg:pt-44 lg:pb-28">
        <div className="container-xl text-center sm:text-left">
          <span className="section-label">Extracurricular</span>
          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[0.92] max-w-3xl mx-auto sm:mx-0">
            Activities that build <span className="text-accent">character</span>
            .
          </h1>
          <p className="mt-6 text-white/70 text-lg max-w-lg leading-relaxed mx-auto sm:mx-0">
            From football pitches to performing arts stages, from robotics labs
            to community gardens, our activities develop confident, capable, and
            compassionate young people.
          </p>
        </div>
      </section>

      {CATEGORIES.map((cat) => (
        <section key={cat.name} className="section-wrapper bg-white">
          <div className="container-xl">
            <div className="flex items-center gap-4 mb-10">
              <div
                className={`w-12 h-12 ${cat.colour} rounded-xl flex items-center justify-center`}
              >
                <span className="text-white text-2xl">{cat.icon}</span>
              </div>
              <span className="section-label">{cat.name}</span>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {cat.items.map((item) => (
                <div
                  key={item.name}
                  className="bg-school-off-white p-6 rounded-xl shadow-sm"
                >
                  <h3 className="font-bold text-school-black text-base">
                    {item.name}
                  </h3>
                  <div className="flex flex-wrap gap-1 mt-2 mb-3">
                    {item.campuses.map((c) => (
                      <span
                        key={c}
                        className="text-xs px-2 py-0.5 bg-primary-50 text-accent font-semibold rounded-md"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="py-16 bg-primary">
        <div className="container-xl text-center">
          <h2 className="text-3xl font-bold text-white">
            Questions about activities or clubs?
          </h2>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center px-8 py-4 bg-white text-accent font-bold hover:bg-white/90 transition-colors text-sm uppercase tracking-wide rounded-lg shadow-sm"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </>
  );
}

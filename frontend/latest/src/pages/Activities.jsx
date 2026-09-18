import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";

// The school runs a single campus, so each activity is tagged with the year
// groups it is open to — the question a parent actually has when reading this.
const CATEGORIES = [
  {
    name: "Sports & Athletics",
    icon: "⬡",
    colour: "bg-primary",
    items: [
      {
        name: "Football",
        years: ["Year 2+"],
        desc: "Competitive squads from Year 2 upwards, with fixtures against local schools and a championship each spring term.",
      },
      {
        name: "Swimming",
        years: ["All years"],
        desc: "Weekly lessons for every year group at the campus pool, plus squad training for competitive swimmers.",
      },
      {
        name: "Athletics",
        years: ["All years"],
        desc: "Track and field for all year groups, building towards the annual school athletics day.",
      },
      {
        name: "Basketball",
        years: ["Year 4+"],
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
        years: ["All years"],
        desc: "Open to every year group, rehearsing weekly and performing at Cultural Day and the annual concert.",
      },
      {
        name: "Drama Club",
        years: ["Year 3+"],
        desc: "Term-time rehearsals culminating in a full stage production for parents and the community.",
      },
      {
        name: "Dance & Movement",
        years: ["All years"],
        desc: "African dance, contemporary, and creative movement performed at Cultural Day and assemblies.",
      },
      {
        name: "Music Tuition",
        years: ["All years"],
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
        years: ["Year 3+"],
        desc: "Weekly sessions using Scratch, Python, and block coding. Students build apps and games each term.",
      },
      {
        name: "Robotics",
        years: ["Year 4+"],
        desc: "Design, build, and program robots. Teams compete in the national Junior Robotics Challenge.",
      },
      {
        name: "Science Explorers",
        years: ["All years"],
        desc: "Hands-on science experiments beyond the classroom curriculum.",
      },
      {
        name: "Eco & Green Club",
        years: ["All years"],
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
        years: ["Year 3+"],
        desc: "Elected student representatives from Year 3 upwards, meeting monthly to voice ideas.",
      },
      {
        name: "Debate Club",
        years: ["Year 5+"],
        desc: "Structured debating sessions with inter-school competitions from Year 5.",
      },
      {
        name: "Cultural Arts",
        years: ["All years"],
        desc: "African art, batik, beading, and textile arts taught by specialist cultural educators.",
      },
      {
        name: "Community Service",
        years: ["Year 2+"],
        desc: "Regular community outreach days, charity drives, and volunteering initiatives.",
      },
    ],
  },
];

export default function Activities() {
  return (
    <>
      <PageHero
        label="Extracurricular"
        title={<>Activities that build <span className="text-accent">character</span>.</>}
        intro="From football pitches to performing arts stages, from robotics labs to community gardens, our activities develop confident, capable, and compassionate young people."
      />

      {CATEGORIES.map((cat) => (
        // Tighter rhythm than `.section-wrapper`: four consecutive white
        // sections would otherwise stack pb-28 on pt-28 and leave a ~14rem
        // empty band between each category.
        <section key={cat.name} className="py-12 lg:py-16 bg-white">
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
                    {item.years.map((y) => (
                      <span
                        key={y}
                        className="text-xs px-2 py-0.5 bg-primary-50 text-accent font-semibold rounded-md"
                      >
                        {y}
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

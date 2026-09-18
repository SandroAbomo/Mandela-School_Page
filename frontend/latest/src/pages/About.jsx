import { Link } from "react-router-dom";
import PageHero from "../components/PageHero";

const LEADERSHIP = [
  {
    name: "Dr. Nkosi Dlamini",
    role: "Headteacher & Co-Founder",
    bio: "A former Cambridge lecturer with 20 years in African education policy, Dr. Dlamini co-founded the school with a vision to create a world-class institution grounded in African excellence.",
    initial: "ND",
  },
  {
    name: "Mrs. Fatima Al-Hassan",
    role: "Deputy Head — Academics",
    bio: "With a Masters in Education from UCL, Mrs. Al-Hassan leads bilingual curriculum development, ensuring consistency and innovation in every classroom.",
    initial: "FA",
  },
  {
    name: "Mr. Emmanuel Boateng",
    role: "Head of Admissions & Community",
    bio: "Mr. Boateng oversees the admissions process and school-community partnerships, passionate about making the school accessible to every family.",
    initial: "EB",
  },
  {
    name: "Ms. Akosua Mensah",
    role: "Head of Student Wellbeing",
    bio: "A certified counsellor and educator, Ms. Mensah champions mental health, inclusion, and student voice throughout our school community.",
    initial: "AM",
  },
];

const TIMELINE = [
  {
    year: "2010",
    event:
      "School founded with 80 students and a vision for bilingual excellence.",
  },
  {
    year: "2012",
    event: "Affiliated with the Cambridge International curriculum framework.",
  },
  {
    year: "2015",
    event:
      "Full bilingual immersion programme launched across all year groups.",
  },
  {
    year: "2018",
    event: "Awarded Best Primary School, Regional Education Awards.",
  },
  {
    year: "2022",
    event: "Surpassed 750 students, reflecting overwhelming community demand.",
  },
  {
    year: "2025",
    event: "Celebrating 15 years of transformational bilingual education.",
  },
  { year: "2026", event: "Applications open for the 2026–2027 academic year." },
];

export default function About() {
  return (
    <>
      <PageHero
        label="Our Story"
        title={<>Built on belief.<br />Driven by <span className="text-accent">purpose</span>.</>}
        intro="For over 15 years, Mandela Bilingual Nursery and Primary has been transforming lives through bilingual education rooted in excellence, identity, and community."
      />

      <section className="section-wrapper bg-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <span className="section-label">Our Mission</span>
              <h2 className="mt-3 section-heading">Why we exist.</h2>
              <p className="mt-6 text-slate-500 leading-relaxed">
                To provide every African child with access to world-class
                primary education that equips them with the knowledge, skills,
                and character to succeed, while remaining proudly rooted in
                their cultural identity.
              </p>
            </div>
            <div>
              <span className="section-label">Our Vision</span>
              <h2 className="mt-3 section-heading">Where we&rsquo;re going.</h2>
              <p className="mt-6 text-slate-500 leading-relaxed">
                To be the leading network of primary schools across the
                continent, a model that proves African schools can be among the
                finest in the world without sacrificing cultural authenticity.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrapper bg-school-off-white">
        <div className="container-xl">
          <div className="text-center mb-14">
            <span className="section-label">Our History</span>
            <h2 className="mt-3 section-heading">15 years of milestones.</h2>
          </div>
          <div className="max-w-3xl mx-auto">
            {TIMELINE.map((item, i) => (
              <div key={item.year} className="flex gap-8 items-start">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-xs">
                      {item.year}
                    </span>
                  </div>
                  {i < TIMELINE.length - 1 && (
                    <div
                      className="w-px bg-gray-200 flex-grow"
                      style={{ minHeight: 40 }}
                    />
                  )}
                </div>
                <div className="pb-10">
                  <p className="text-slate-500 leading-relaxed pt-3">
                    {item.event}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrapper bg-white">
        <div className="container-xl">
          <div className="text-center mb-14">
            <span className="section-label">Leadership Team</span>
            <h2 className="mt-3 section-heading">
              The people behind the mission.
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {LEADERSHIP.map(({ name, role, bio, initial }) => (
              <div
                key={name}
                className="bg-school-off-white p-6 rounded-2xl shadow-sm"
              >
                <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mb-5">
                  <span className="text-white font-bold text-base">
                    {initial}
                  </span>
                </div>
                <h3 className="font-bold text-school-black">{name}</h3>
                <p className="text-accent text-sm font-semibold mt-0.5">
                  {role}
                </p>
                <p className="mt-3 text-slate-700 text-sm leading-relaxed">
                  {bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="container-xl text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white">
            Join our community today.
          </h2>
          <div className="mt-6 flex gap-4 justify-center flex-wrap">
            <Link
              to="/admissions"
              className="inline-flex items-center px-8 py-4 bg-white text-accent font-bold hover:bg-white/90 transition-colors text-sm uppercase tracking-wide rounded-lg shadow-sm"
            >
              Apply Now
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 border border-white/40 text-white font-bold hover:bg-white/10 transition-colors text-sm uppercase tracking-wide rounded-lg"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

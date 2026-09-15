import { Link } from 'react-router-dom';

const ACTIVITIES = [
  { icon: '⬡', name: 'Athletics & Sports', desc: 'Football, swimming, athletics, and team sports with competitive fixtures throughout the year.' },
  { icon: '⬢', name: 'Performing Arts', desc: 'Drama, music, choir, and dance with termly student showcases open to the whole school community.' },
  { icon: '⬠', name: 'STEM Club', desc: "Robotics, coding, and hands-on science experiments designed to build tomorrow's innovators." },
  { icon: '◆', name: 'Cultural Arts', desc: 'African art, local languages, storytelling, and heritage programmes that celebrate identity.' },
  { icon: '◈', name: 'Debate & Leadership', desc: 'Public speaking, inter-school debating competitions, and an active student council.' },
  { icon: '◉', name: 'Community Service', desc: 'Regular outreach initiatives building empathy, civic responsibility, and community connection.' },
];

export default function ActivitiesSection() {
  return (
    <section className="section-wrapper bg-school-black">
      <div className="container-xl">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between mb-14 gap-6">
          <div>
            <span className="section-label">Beyond the Classroom</span>
            <h2 className="mt-3 text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight">
              Activities that<br />shape character.
            </h2>
          </div>
          <p className="text-white/50 max-w-sm leading-relaxed text-sm lg:text-right">
            Who students become outside the classroom is just as important as what they learn inside it.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ACTIVITIES.map(({ icon, name, desc }) => (
            <div key={name} className="bg-white/5 p-8 hover:bg-white/10 transition-colors duration-300 rounded-xl">
              <span className="text-3xl text-accent">{icon}</span>
              <h3 className="mt-5 font-bold text-white text-lg">{name}</h3>
              <p className="mt-2 text-white/50 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link to="/activities" className="btn-outline-white">View All Activities</Link>
        </div>
      </div>
    </section>
  );
}

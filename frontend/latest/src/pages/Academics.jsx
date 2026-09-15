import { Link } from 'react-router-dom';

const STAGES = [
  { label: 'Stage 1', level: 'Early Years Foundation', ages: 'Ages 3–5', classes: 'Nursery & Reception', desc: 'Our Early Years programme is built around joyful learning. Children explore and develop through planned play, storytelling, music, and movement. Literacy and numeracy foundations are introduced naturally within rich, stimulating environments.', subjects: ['Literacy & Phonics', 'Early Numeracy', 'Creative Arts', 'Physical Education', 'Personal & Social Development', 'Understanding the World'] },
  { label: 'Stage 2', level: 'Lower Primary', ages: 'Ages 6–8', classes: 'Year 1 – Year 3', desc: 'Lower Primary introduces structured academic learning through inquiry-based teaching. Children are encouraged to ask questions and develop reading, writing, and mathematical fluency. Cultural Studies begins here, weaving African history and identity into everyday learning.', subjects: ['English Language & Literacy', 'Mathematics', 'Science & Discovery', 'Cultural Studies', 'French (Introductory)', 'Art & Design', 'Physical Education'] },
  { label: 'Stage 3', level: 'Upper Primary', ages: 'Ages 9–12', classes: 'Year 4 – Year 7', desc: 'Upper Primary deepens academic rigour and prepares students for secondary school with confidence. Critical thinking, research skills, and collaborative project work are central. Students develop leadership skills through classroom roles and inter-campus initiatives.', subjects: ['Advanced English', 'Advanced Mathematics', 'Integrated Science', 'STEM & Robotics', 'French (Fluency)', 'African Studies', 'Leadership & Ethics', 'Digital Literacy'] },
];

const PRINCIPLES = [
  { title: 'Inquiry-Led Learning', desc: 'Students question, investigate, and construct understanding rather than passively receive information.' },
  { title: 'African Context', desc: 'All subjects are contextualised with African examples, stories, scientists, and mathematicians.' },
  { title: 'Assessment for Learning', desc: 'Formative assessment and regular feedback guide teaching. Progress is celebrated and challenges addressed early.' },
  { title: 'High Expectations for All', desc: 'Differentiated teaching ensures no student is left behind or unchallenged.' },
];

export default function Academics() {
  return (
    <>
      <section className="bg-school-black pt-36 pb-20 lg:pt-44 lg:pb-28">
        <div className="container-xl text-center sm:text-left">
          <span className="section-label">Academics</span>
          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[0.92] max-w-3xl mx-auto sm:mx-0">
            A curriculum built to <span className="text-accent">inspire</span>.
          </h1>
          <p className="mt-6 text-white/60 text-lg max-w-lg leading-relaxed mx-auto sm:mx-0">Aligned with Cambridge International standards and enriched with African context, our curriculum prepares students to think critically, communicate clearly, and lead with confidence.</p>
        </div>
      </section>

      <section className="section-wrapper bg-white">
        <div className="container-xl">
          <div className="text-center mb-14"><span className="section-label">Teaching Approach</span><h2 className="mt-3 section-heading">How we teach.</h2></div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRINCIPLES.map(({ title, desc }) => (
              <div key={title} className="p-6 bg-school-off-white rounded-xl shadow-sm">
                <div className="w-8 h-1 bg-primary mb-4 rounded-full" />
                <h3 className="font-bold text-school-black mb-2">{title}</h3>
                <p className="text-slate-700 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrapper bg-school-off-white">
        <div className="container-xl">
          <div className="text-center mb-14"><span className="section-label">Curriculum Stages</span><h2 className="mt-3 section-heading">Learning from 3 to 12.</h2></div>
          <div className="space-y-6">
            {STAGES.map((stage) => (
              <div key={stage.level} className="bg-white p-8 lg:p-10 rounded-2xl shadow-sm">
                <div className="grid lg:grid-cols-3 gap-8">
                  <div><span className="text-xs font-bold text-slate-700 uppercase tracking-widest">{stage.label}</span><h3 className="mt-1 text-2xl font-bold text-school-black">{stage.level}</h3><p className="text-accent font-semibold text-sm mt-1">{stage.ages} · {stage.classes}</p></div>
                  <div className="lg:col-span-2">
                    <p className="text-slate-500 leading-relaxed mb-5">{stage.desc}</p>
                    <div className="flex flex-wrap gap-2">{stage.subjects.map((s) => <span key={s} className="px-3 py-1 bg-school-off-white border border-gray-100 text-slate-500 text-xs font-medium rounded-md">{s}</span>)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 bg-primary">
        <div className="container-xl text-center">
          <h2 className="text-3xl font-bold text-white">Want to learn more about our curriculum?</h2>
          <div className="mt-6 flex gap-4 justify-center flex-wrap">
            <Link to="/admissions" className="inline-flex items-center px-8 py-4 bg-white text-accent font-bold hover:bg-white/90 transition-colors text-sm uppercase tracking-wide rounded-lg shadow-sm">Book an Open Day</Link>
            <Link to="/contact" className="inline-flex items-center px-8 py-4 border border-white/40 text-white font-bold hover:bg-white/10 transition-colors text-sm uppercase tracking-wide rounded-lg">Contact Us</Link>
          </div>
        </div>
      </section>
    </>
  );
}

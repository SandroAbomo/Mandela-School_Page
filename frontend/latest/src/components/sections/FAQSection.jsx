import { useState } from 'react';

const FAQS = [
  { q: 'What age range does Mandela Bilingual Nursery and Primary accept?', a: 'We accept children from age 3 (Nursery) through to age 12 (Upper Primary, Class 7), offering the full bilingual primary range under one roof.' },
  { q: 'How do I apply?', a: 'Visit our Admissions page to find open day dates, download the application form, and view our entry requirements. You can also submit an online enquiry and our team will respond within two working days.' },
  { q: 'What languages does the bilingual programme cover?', a: 'Our bilingual programme provides immersive instruction in two languages throughout the school day, building genuine fluency from the earliest years. Contact the admissions office for details on the specific language pairing.' },
  { q: 'Is the curriculum internationally recognised?', a: 'Yes. Our curriculum is aligned with the Cambridge Primary framework and enriched with a bilingual strand, cultural studies, and a strong focus on character education and leadership.' },
  { q: 'Do you offer scholarships or bursaries?', a: 'We believe in access to quality education for all. A limited number of merit-based scholarships and need-based bursaries are available each academic year. Contact the admissions office for details.' },
  { q: 'What extracurricular activities are available?', a: 'We offer a wide range of clubs including sports, performing arts, STEM, debate, cultural arts, and community service. Visit our Activities page for the full list.' },
];

export default function FAQSection() {
  const [open, setOpen] = useState(null);

  return (
    <section className="section-wrapper bg-school-off-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="section-label">FAQ</span>
          <h2 className="mt-3 section-heading">Common questions.</h2>
        </div>
        <div className="space-y-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-6 text-left" aria-expanded={open === i}>
                <span className="font-semibold text-school-black pr-4 leading-snug">{faq.q}</span>
                <span className={`text-accent text-2xl flex-shrink-0 transition-transform duration-300 ${open === i ? 'rotate-45' : ''}`}>+</span>
              </button>
              {open === i && (
                <div className="px-6 pb-6">
                  <p className="text-slate-500 leading-relaxed text-sm lg:text-base">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

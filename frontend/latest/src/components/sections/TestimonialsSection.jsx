const TESTIMONIALS = [
  { quote: "Mandela Bilingual gave my daughter the confidence to believe she could achieve anything. The teachers genuinely care about each child's journey, not just academically, but as a person.", author: 'Amara K.', role: 'Parent — Year 4', initial: 'A' },
  { quote: "The bilingual programme is outstanding. My son switches between languages effortlessly and his confidence has soared. It's the best decision we ever made for his education.", author: 'James O.', role: 'Parent — Year 2', initial: 'J' },
  { quote: "As a teacher here for six years, I can say this is the most purpose-driven school I have worked in. The vision is clear, the community is remarkable, and the children make it all worthwhile.", author: 'Ms. Thandi N.', role: 'Class 5 Teacher', initial: 'T' },
];

export default function TestimonialsSection() {
  return (
    <section className="section-wrapper bg-school-off-white">
      <div className="container-xl">
        <div className="text-center mb-14">
          <span className="section-label">Community Voice</span>
          <h2 className="mt-3 section-heading">What families say.</h2>
        </div>
        <div className="grid lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map(({ quote, author, role, initial }) => (
            <div key={author} className="bg-white p-8 flex flex-col rounded-2xl shadow-sm">
              <div className="text-accent text-6xl font-serif leading-none mb-4 select-none">&ldquo;</div>
              <p className="text-slate-500 leading-relaxed flex-grow italic text-sm lg:text-base">{quote}</p>
              <div className="mt-8 flex items-center gap-4">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-sm">{initial}</span>
                </div>
                <div>
                  <p className="font-bold text-school-black text-sm">{author}</p>
                  <p className="text-slate-700 text-xs mt-0.5">{role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

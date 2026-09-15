import { Link } from 'react-router-dom';
import EnquiryForm from '../components/EnquiryForm';

const STEPS = [
  { step: '01', title: 'Submit an Enquiry', desc: 'Complete our online enquiry form or call the admissions office. We will send you our prospectus and invite you to an open day.' },
  { step: '02', title: 'Attend an Open Day', desc: 'Visit your preferred campus, tour the facilities, meet the team, and get a feel for our community firsthand.' },
  { step: '03', title: 'Complete Application', desc: "Submit the formal application form with your child's birth certificate, previous school records, and two references." },
  { step: '04', title: 'Assessment Day', desc: 'Children joining Year 2 and above attend a short, informal assessment to help us understand their learning needs.' },
  { step: '05', title: 'Offer & Acceptance', desc: 'Successful applicants receive a formal offer letter. Secure your place by returning the acceptance form with the registration fee.' },
];

const KEY_DATES = [
  { label: 'Open Day — Main Campus', date: '14 June 2026' },
  { label: 'Application Deadline (Sept 2026 entry)', date: '31 July 2026' },
  { label: 'Assessment Days', date: 'August 2026' },
  { label: 'Offers Issued', date: '1 September 2026' },
];

export default function Admissions() {
  return (
    <>
      <section className="bg-school-black pt-36 pb-20 lg:pt-44 lg:pb-28">
        <div className="container-xl text-center sm:text-left">
          <span className="section-label">Admissions</span>
          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[0.92] max-w-3xl mx-auto sm:mx-0">
            Your child's journey <span className="text-accent">starts here</span>.
          </h1>
          <p className="mt-6 text-white/60 text-lg max-w-lg leading-relaxed mx-auto sm:mx-0">
            We welcome applications for all year groups from Early Years to Class 7, subject to availability. Our admissions process is straightforward, personal, and designed with families in mind.
          </p>
        </div>
      </section>

      <section className="section-wrapper bg-white">
        <div className="container-xl">
          <div className="text-center mb-14">
            <span className="section-label">The Process</span>
            <h2 className="mt-3 section-heading">How to apply.</h2>
          </div>
          <div className="max-w-3xl mx-auto space-y-4">
            {STEPS.map(({ step, title, desc }) => (
              <div key={step} className="flex gap-6 p-6 bg-school-off-white items-start rounded-xl shadow-sm">
                <span className="text-4xl font-bold text-gray-200 flex-shrink-0 leading-none">{step}</span>
                <div>
                  <h3 className="font-bold text-school-black text-lg">{title}</h3>
                  <p className="mt-1 text-slate-700 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-wrapper bg-school-off-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="section-label">Important Dates</span>
              <h2 className="mt-3 section-heading">Key dates for 2026–2027 entry.</h2>
              <div className="mt-8 space-y-3">
                {KEY_DATES.map(({ label, date }) => (
                  <div key={label} className="flex justify-between items-center py-4 border-b border-gray-200">
                    <span className="text-slate-500 text-sm font-medium">{label}</span>
                    <span className="text-accent font-bold text-sm ml-4 flex-shrink-0">{date}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-school-black p-8 text-white rounded-xl shadow-sm">
              <h3 className="font-bold text-xl mb-4 text-accent">What we look for</h3>
              <ul className="space-y-4 text-sm text-white/60 leading-relaxed">
                {['Curiosity and enthusiasm for learning', 'Respect for self, others, and the environment', 'Families who share our values and ethos', 'Commitment to the school community'].map((item) => (
                  <li key={item} className="flex gap-3"><span className="text-accent font-bold flex-shrink-0">,</span>{item}</li>
                ))}
              </ul>
              <div className="mt-8 pt-8 border-t border-white/10">
                <p className="text-sm text-white/40">Scholarships &amp; bursaries available.</p>
                <Link to="/contact" className="mt-3 inline-flex items-center text-accent text-sm font-semibold">Enquire about financial support →</Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrapper bg-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="section-label">Get in Touch</span>
              <h2 className="mt-3 section-heading">Start your enquiry.</h2>
              <p className="mt-6 text-slate-500 leading-relaxed">Fill in the form and our admissions team will be in touch within two working days.</p>
              <div className="mt-8 space-y-4 text-sm">
                <div><p className="font-bold text-school-black">Admissions Office</p><a href="mailto:admissions@mandelabilingual.sch" className="text-accent hover:underline">admissions@mandelabilingual.sch</a></div>
                <div><p className="font-bold text-school-black">Phone</p><a href="tel:+18000000000" className="text-slate-500 hover:text-accent">+1 (800) 000-0000</a></div>
                <div><p className="font-bold text-school-black">Office hours</p><p className="text-slate-500">Monday – Friday, 8:00am – 4:30pm</p></div>
              </div>
            </div>
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}

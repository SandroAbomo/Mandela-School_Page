import EnquiryForm from "../components/EnquiryForm";
import PageHero from "../components/PageHero";

/* ------------------------------------------------------------------ icons --
 * Drawn inline rather than pulled from an icon package: there are nine of them,
 * they share one stroke weight, and a dependency for that is not worth it.
 */
const Icon = ({ d, className = "", filled = false }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={className}
    fill={filled ? "currentColor" : "none"}
    stroke={filled ? "none" : "currentColor"}
    strokeWidth="1.7"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d={d} />
  </svg>
);

const PATH = {
  pin: "M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z M12 10.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Z",
  mail: "M3 6h18v12H3z M3 7l9 6 9-6",
  people:
    "M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z M3 20c0-3.3 2.7-5 6-5s6 1.7 6 5 M17 10.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z M17 15c2.5 0 4 1.7 4 4",
  phone:
    "M5 3h3l2 5-2.5 1.5a12 12 0 0 0 6 6L15 13l5 2v3a2 2 0 0 1-2.2 2A16.5 16.5 0 0 1 3 5.2 2 2 0 0 1 5 3Z",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z M12 7v5l3 2",
  calendar: "M4 6h16v15H4z M4 10h16 M8 3v4 M16 3v4",
  book: "M12 6.5C10.5 5 8 4.5 4 5v13c4-.5 6.5 0 8 1.5 1.5-1.5 4-2 8-1.5V5c-4-.5-6.5 0-8 1.5Z M12 6.5v13",
  heart:
    "M12 20.5S3.5 15 3.5 9.4A4.4 4.4 0 0 1 12 7.2a4.4 4.4 0 0 1 8.5 2.2c0 5.6-8.5 11.1-8.5 11.1Z",
  star: "m12 3.5 2.6 5.4 5.9.8-4.3 4.1 1.1 5.9-5.3-2.9-5.3 2.9 1.1-5.9L3.5 9.7l5.9-.8L12 3.5Z",
  arrow: "M5 12h14 M13 6l6 6-6 6",
};

/* ----------------------------------------------------------------- content -- */

const CONTACTS = [
  {
    title: "Main Campus",
    strap: "Our main school site",
    icon: PATH.pin,
    card: "bg-[#F4F7FC] border-[#E2EAF5]",
    circle: "bg-[#DDE8F6] text-primary",
    rows: [
      { icon: PATH.pin, label: "Address", value: "15 Mandela Drive, Central District" },
      { icon: PATH.phone, label: "Phone", value: "+1 (800) 100-0001", href: "tel:+18001000001" },
      { icon: PATH.mail, label: "Email", value: "campus@mandelabilingual.sch", href: "mailto:campus@mandelabilingual.sch" },
      { icon: PATH.clock, label: "Office hours", value: "Mon – Fri, 7:30am – 5:00pm" },
    ],
  },
  {
    title: "General Enquiries",
    strap: "We're here to help",
    icon: PATH.mail,
    card: "bg-[#FDF6F1] border-[#F5E3D6]",
    circle: "bg-[#FADFCB] text-[#C2410C]",
    intro: "For general questions about our school, programmes, or visits, please get in touch.",
    rows: [
      { icon: PATH.mail, label: "Email", value: "info@mandelabilingual.sch", href: "mailto:info@mandelabilingual.sch" },
      { icon: PATH.clock, label: "Response time", value: "Within 2 working days" },
    ],
  },
  {
    title: "Admissions Office",
    strap: "Start their journey with us",
    icon: PATH.people,
    card: "bg-[#F2F8F4] border-[#DCEBE1]",
    circle: "bg-[#D5EADD] text-[#15704A]",
    intro: "For enquiries about admissions, applications and school tours.",
    rows: [
      { icon: PATH.mail, label: "Email", value: "admissions@mandelabilingual.sch", href: "mailto:admissions@mandelabilingual.sch" },
      { icon: PATH.phone, label: "Phone", value: "+1 (800) 100-0002", href: "tel:+18001000002" },
      { icon: PATH.clock, label: "Response time", value: "Within 2 working days" },
    ],
  },
];

const PROMISES = [
  { icon: PATH.book, colour: "text-primary", title: "Happy learners", line: "Today. Tomorrow. For life." },
  { icon: PATH.heart, colour: "text-[#E4572E]", title: "A caring community", line: "Where every child belongs." },
  { icon: PATH.star, colour: "text-[#E3A008]", title: "Bright futures", line: "Built together." },
];

function ContactCard({ title, strap, icon, card, circle, intro, rows }) {
  return (
    <div className={`rounded-2xl border p-6 sm:p-7 lg:p-8 ${card}`}>
      <div className="flex items-center gap-4">
        <span className={`w-12 h-12 rounded-full grid place-items-center flex-shrink-0 ${circle}`}>
          <Icon d={icon} className="w-6 h-6" />
        </span>
        <div className="min-w-0">
          <h3 className="font-bold text-school-black text-lg leading-tight">{title}</h3>
          <p className="text-sm text-slate-600 mt-0.5">{strap}</p>
        </div>
      </div>

      <div className="mt-6 pt-6 border-t border-black/5">
        {intro && <p className="text-sm text-slate-600 leading-relaxed mb-5">{intro}</p>}

        <ul className="space-y-4">
          {rows.map(({ icon: rowIcon, label, value, href }) => (
            <li key={label} className="flex gap-3">
              <Icon d={rowIcon} className="w-[18px] h-[18px] mt-0.5 text-slate-500 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-sm font-bold text-school-black">{label}</p>
                {href ? (
                  // break-all, not break-words: an address like
                  // admissions@mandelabilingual.sch is one unbreakable "word"
                  // that is wider than a card on a 320px screen.
                  <a href={href} className="text-sm text-slate-600 hover:text-primary transition-colors break-all">
                    {value}
                  </a>
                ) : (
                  <p className="text-sm text-slate-600">{value}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Contact() {
  return (
    <>
      <PageHero
        label="Contact Us"
        title={<>We&rsquo;d love to hear from <span className="text-accent">you</span>.</>}
        intro="Whether you have a question about admissions, curriculum, or school life, our team is ready to help."
      />

      {/* Who to contact */}
      <section className="bg-school-off-white pt-14 pb-14">
        <div className="container-xl">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {CONTACTS.map((c) => (
              <ContactCard key={c.title} {...c} />
            ))}
          </div>
        </div>
      </section>

      {/* Visit prompt */}
      <section className="bg-school-off-white pb-16 lg:pb-20">
        <div className="container-xl">
          <div className="rounded-2xl bg-[#E8F0FA] border border-[#D6E4F3] px-7 py-8 lg:px-10 lg:py-9">
            <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">
              <span className="w-14 h-14 rounded-full bg-white/70 text-primary grid place-items-center flex-shrink-0">
                <Icon d={PATH.calendar} className="w-7 h-7" />
              </span>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-school-black">Arrange a visit</h2>
                <p className="mt-2 text-slate-600 leading-relaxed max-w-xl">
                  We&rsquo;d be delighted to welcome you to our school. Get in touch to
                  arrange a visit or a tour.
                </p>
              </div>
              <a
                href="#enquiry"
                className="inline-flex items-center gap-2 px-7 py-4 bg-primary text-white font-semibold rounded-lg shadow-sm hover:bg-primary-dark transition-colors flex-shrink-0"
              >
                Request a visit
                <Icon d={PATH.arrow} className="w-[18px] h-[18px]" />
              </a>

              {/* Leaf flourish — a flex item rather than an absolute overlay, so
                  it can never sit underneath the button. */}
              <svg
                viewBox="0 0 120 120"
                aria-hidden="true"
                className="hidden xl:block w-24 h-24 flex-shrink-0 text-[#C2D8EF]"
              >
                <g fill="currentColor">
                  <path d="M62 112c0-26 12-45 34-56-4 26-15 44-34 56Z" />
                  <path d="M58 112C48 88 50 66 66 46c8 25 5 47-8 66Z" />
                  <path d="M54 112C36 94 30 73 38 48c17 19 22 40 16 64Z" />
                </g>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Enquiry form — kept on this page because it is what turns a visitor
          into a tracked enquiry in the staff dashboard. */}
      <section id="enquiry" className="section-wrapper bg-white scroll-mt-24">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <div>
              <span className="section-label">Send a message</span>
              <h2 className="mt-3 section-heading">Submit your enquiry.</h2>
              <p className="mt-5 text-slate-600 leading-relaxed">
                Use the form and our team will get back to you within two working
                days. Every enquiry reaches the admissions office directly.
              </p>

              <ul className="mt-8 space-y-4">
                {[
                  "We reply to every enquiry, usually sooner than two days.",
                  "Ask about places, fees, the curriculum or a tour.",
                  "Prefer to talk? Call the office on +1 (800) 100-0001.",
                ].map((line) => (
                  <li key={line} className="flex gap-3 text-sm text-slate-600">
                    <span className="w-5 h-5 rounded-full bg-primary-50 text-primary grid place-items-center flex-shrink-0 mt-0.5">
                      <Icon d="M5 12.5 10 17l9-10" className="w-3 h-3" />
                    </span>
                    {line}
                  </li>
                ))}
              </ul>
            </div>

            <EnquiryForm />
          </div>
        </div>
      </section>

      {/* Closing promise */}
      <section className="bg-school-off-white py-12 lg:py-14">
        <div className="container-xl">
          <ul className="grid sm:grid-cols-3 gap-8 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-black/5">
            {PROMISES.map(({ icon, colour, title, line }) => (
              <li key={title} className="flex items-center gap-4 pt-8 first:pt-0 sm:pt-0 sm:px-6 sm:first:pl-0">
                <Icon d={icon} filled className={`w-8 h-8 flex-shrink-0 ${colour}`} />
                <div>
                  <p className="font-bold text-school-black">{title}</p>
                  <p className="text-sm text-slate-600 mt-0.5">{line}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

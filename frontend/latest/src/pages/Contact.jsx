import EnquiryForm from "../components/EnquiryForm";

const CAMPUS = {
  name: "Main Campus",
  address: "15 Mandela Drive, Central District",
  phone: "+1 (800) 100-0001",
  email: "campus@mandelabilingual.sch",
  hours: "Mon–Fri, 7:30am – 5:00pm",
};

export default function Contact() {
  return (
    <>
      <section className="bg-school-black pt-36 pb-20 lg:pt-44 lg:pb-28">
        <div className="container-xl text-center sm:text-left">
          <span className="section-label">Contact Us</span>
          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-7xl font-bold text-white tracking-tight leading-[0.92] max-w-2xl mx-auto sm:mx-0">
            We'd love to hear from <span className="text-accent">you</span>.
          </h1>
          <p className="mt-6 text-white/70 text-lg max-w-lg leading-relaxed mx-auto sm:mx-0">
            Whether you have a question about admissions, curriculum, or school
            life, our team is ready to help.
          </p>
        </div>
      </section>

      <section className="section-wrapper bg-school-off-white">
        <div className="container-xl">
          <div className="text-center mb-12">
            <span className="section-label">Campus Contact</span>
            <h2 className="mt-3 section-heading">Reach us directly.</h2>
          </div>
          <div className="max-w-sm mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-8 h-1 bg-primary mb-5 rounded-full" />
              <h3 className="font-bold text-school-black text-lg">
                {CAMPUS.name}
              </h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-500">
                <li>
                  <span className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-0.5">
                    Address
                  </span>
                  {CAMPUS.address}
                </li>
                <li>
                  <span className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-0.5">
                    Phone
                  </span>
                  <a
                    href={`tel:${CAMPUS.phone}`}
                    className="hover:text-accent transition-colors"
                  >
                    {CAMPUS.phone}
                  </a>
                </li>
                <li>
                  <span className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-0.5">
                    Email
                  </span>
                  <a
                    href={`mailto:${CAMPUS.email}`}
                    className="hover:text-accent transition-colors"
                  >
                    {CAMPUS.email}
                  </a>
                </li>
                <li>
                  <span className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-0.5">
                    Office Hours
                  </span>
                  {CAMPUS.hours}
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="bg-school-black p-8 text-white rounded-xl shadow-sm">
              <h3 className="font-bold text-lg mb-4 text-accent">
                General Enquiries
              </h3>
              <p className="text-sm text-white/70">
                <span className="text-white font-semibold">Email: </span>
                <a
                  href="mailto:info@mandelabilingual.sch"
                  className="hover:text-accent transition-colors"
                >
                  info@mandelabilingual.sch
                </a>
              </p>
            </div>
            <div className="bg-primary p-8 text-white rounded-xl shadow-sm">
              <h3 className="font-bold text-lg mb-4 text-accent">
                Admissions Office
              </h3>
              <p className="text-sm text-white/80">
                <span className="text-white font-semibold">Email: </span>
                <a
                  href="mailto:admissions@mandelabilingual.sch"
                  className="hover:text-white transition-colors"
                >
                  admissions@mandelabilingual.sch
                </a>
              </p>
              <p className="text-sm text-white/80 mt-1">
                <span className="text-white font-semibold">Response time:</span>{" "}
                Within 2 working days
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-wrapper bg-white">
        <div className="container-xl">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="section-label">Send a Message</span>
              <h2 className="mt-3 section-heading">Submit your enquiry.</h2>
              <p className="mt-6 text-slate-500 leading-relaxed">
                Use the form to send us a message and our team will get back to
                you within two working days.
              </p>
            </div>
            <EnquiryForm />
          </div>
        </div>
      </section>
    </>
  );
}

import { Link } from "react-router-dom";

export default function CTASection() {
  return (
    <section className="py-20 lg:py-28 bg-primary">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-4xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
          Ready to join our community?
        </h2>
        <p className="mt-6 text-white/80 text-lg max-w-3xl mx-auto leading-relaxed">
          Take the first step towards a transformative education.<br />
          Our admissions team is here to guide you through every step of the journey.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/admissions"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-accent font-bold hover:bg-white/90 transition-colors text-sm uppercase tracking-wide rounded-lg shadow-sm"
          >
            Start Application
          </Link>
          <Link
            to="/contact"
            className="inline-flex items-center justify-center px-8 py-4 border border-white/40 text-white font-bold hover:bg-white/10 transition-colors text-sm uppercase tracking-wide rounded-lg"
          >
            Contact Admissions
          </Link>
        </div>
      </div>
    </section>
  );
}

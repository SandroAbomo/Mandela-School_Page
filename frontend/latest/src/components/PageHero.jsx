import { LOGO_SRC } from "../assets";

/**
 * The banner every inner page opens with.
 *
 * One component rather than the same markup copied into eight pages: the crest
 * watermark, gradient wash and motto only have to be right once, and a change
 * to the treatment lands across the whole site.
 *
 * `title` takes a node so a page can colour its own emphasis word, e.g.
 *   title={<>We&rsquo;d love to hear from <span className="text-accent">you</span>.</>}
 */
export default function PageHero({ label, title, intro, motto = true }) {
  return (
    <section className="relative overflow-hidden bg-school-black pt-36 pb-16 lg:pt-44 lg:pb-24">
      {/* Depth: a navy wash from the top-left, fading into the flat dark base. */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 90% at 12% -10%, rgba(15,45,92,0.85) 0%, transparent 65%), radial-gradient(ellipse 70% 80% at 95% 110%, rgba(15,45,92,0.55) 0%, transparent 60%)",
        }}
      />

      {/* Embossed school crest. Decorative, so it is hidden from screen readers
          and carries an empty alt rather than repeating the school's name. */}
      <img
        src={LOGO_SRC}
        alt=""
        aria-hidden="true"
        width="256"
        height="256"
        className="pointer-events-none select-none absolute opacity-[0.06] mix-blend-luminosity
                   w-[22rem] -right-24 -bottom-16
                   sm:w-[28rem] sm:-right-20
                   lg:w-[34rem] lg:right-0 lg:top-1/2 lg:-translate-y-1/2 lg:bottom-auto"
      />

      {/* Soft curved sweeps, echoing the crest's roundness. */}
      <svg
        viewBox="0 0 1440 600"
        preserveAspectRatio="none"
        aria-hidden="true"
        className="absolute inset-0 w-full h-full pointer-events-none text-white/[0.04]"
      >
        <path d="M-100 520C180 430 420 470 700 380S1180 180 1560 250" fill="none" stroke="currentColor" strokeWidth="2" />
        <path d="M-100 600C220 520 460 560 760 460s500-180 900-110" fill="none" stroke="currentColor" strokeWidth="2" />
      </svg>

      <div className="relative container-xl">
        <div className="max-w-2xl">
          {label && <span className="section-label">{label}</span>}

          <h1 className="mt-3 text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white tracking-tight leading-[0.95]">
            {title}
          </h1>

          {intro && (
            <p className="mt-6 text-white/70 text-lg leading-relaxed max-w-xl">{intro}</p>
          )}

          {motto && (
            <div className="mt-10 lg:mt-12">
              <span className="block w-10 h-[3px] bg-accent rounded-full" aria-hidden="true" />
              <p className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-xs font-bold uppercase tracking-[0.3em] text-white/40">
                <span>Learn</span>
                <span>Grow</span>
                <span>Belong</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

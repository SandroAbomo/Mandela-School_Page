import PageHero from "../components/PageHero";

const PHOTOS = [
  { id: 1, caption: 'Main campus courtyard at break time', size: 'large', bg: 'bg-gray-200' },
  { id: 2, caption: 'Annual Cultural Day celebrations', size: 'small', bg: 'bg-school-warm' },
  { id: 3, caption: 'Year 6 science fair project', size: 'small', bg: 'bg-primary-50' },
  { id: 4, caption: 'School football championship', size: 'small', bg: 'bg-gray-100' },
  { id: 5, caption: 'School choir performance', size: 'large', bg: 'bg-school-off-white' },
  { id: 6, caption: 'Robotics lab in action', size: 'small', bg: 'bg-gray-200' },
  { id: 7, caption: 'Student art exhibition', size: 'small', bg: 'bg-primary-50' },
  { id: 8, caption: 'Swimming gala finals', size: 'small', bg: 'bg-school-warm' },
  { id: 9, caption: 'Bilingual cultural showcase', size: 'large', bg: 'bg-gray-100' },
  { id: 10, caption: 'Drama production', size: 'small', bg: 'bg-school-off-white' },
  { id: 11, caption: 'Outdoor athletics day', size: 'small', bg: 'bg-gray-200' },
  { id: 12, caption: 'Year 7 graduation ceremony', size: 'small', bg: 'bg-primary-50' },
];

export default function Gallery() {
  return (
    <>
      <PageHero
        label="Gallery"
        title={<>Life at <span className="text-accent">Mandela Bilingual</span>.</>}
        intro="A glimpse into the vibrant, busy, and joyful life that happens every day at our campus."
      />

      <section className="section-wrapper bg-white">
        <div className="container-xl">
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
            {PHOTOS.map((photo) => (
              <div key={photo.id} className={`break-inside-avoid ${photo.size === 'large' ? 'h-72' : 'h-48'} ${photo.bg} rounded-xl overflow-hidden flex items-end p-4 group`}>
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 opacity-0 group-hover:opacity-100">
                  <p className="text-school-black text-xs font-semibold bg-white/90 px-3 py-1.5 rounded-md">{photo.caption}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center py-8 bg-school-off-white rounded-xl">
            <p className="text-slate-700 text-sm">Photographs updated each term. Follow us on social media for real-time updates.</p>
          </div>
        </div>
      </section>
    </>
  );
}

/**
 * Fills the dashboard with a realistic term's worth of school data.
 *
 *   npm run seed:demo --prefix backend
 *
 * Everything created here is invented: no real child, guardian or member of
 * staff appears. It exists so the dashboard can be demonstrated and developed
 * against something that looks like a working school.
 *
 * Re-running replaces the demo records rather than duplicating them. It will
 * refuse to touch a database that already holds real-looking data unless
 * SEED_DEMO_FORCE=true is set.
 */
import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import Student from '../models/Student.js';
import Article from '../models/Article.js';
import Event from '../models/Event.js';
import Enquiry from '../models/Enquiry.js';

const FIRST = ['Amara', 'Kwame', 'Zainab', 'Tendai', 'Leila', 'Kofi', 'Nia', 'Sefu', 'Ayana', 'Jabari',
  'Chiamaka', 'Musa', 'Thandiwe', 'Obi', 'Fatou', 'Kelo', 'Imani', 'Baraka', 'Zuri', 'Kito',
  'Adanna', 'Femi', 'Halima', 'Juma', 'Nala', 'Chidi', 'Asha', 'Rudo', 'Simba', 'Yaa'];
const LAST = ['Okafor', 'Mensah', 'Diallo', 'Moyo', 'Haddad', 'Asante', 'Nkemdirim', 'Sow', 'Bello', 'Achebe',
  'Dube', 'Kamara', 'Osei', 'Traore', 'Mwangi', 'Banda', 'Adeyemi', 'Cisse', 'Zuma', 'Owusu'];

const YEAR_GROUPS = ['Nursery', 'Reception', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7'];

const pick = (arr, i) => arr[i % arr.length];
const daysFromNow = (n) => new Date(Date.now() + n * 86400000);

function buildStudents() {
  const students = [];
  // A plausible roll: bigger at the bottom of the school, tapering upwards.
  const sizes = { Nursery: 10, Reception: 9, 'Year 1': 8, 'Year 2': 8, 'Year 3': 7, 'Year 4': 7, 'Year 5': 6, 'Year 6': 5, 'Year 7': 4 };
  let n = 0;

  for (const yearGroup of YEAR_GROUPS) {
    for (let i = 0; i < sizes[yearGroup]; i += 1, n += 1) {
      const firstName = pick(FIRST, n * 7 + i);
      const lastName = pick(LAST, n * 3 + i);
      students.push({
        firstName,
        lastName,
        yearGroup,
        guardianName: `${pick(FIRST, n + 11)} ${lastName}`,
        guardianEmail: `${firstName}.${lastName}`.toLowerCase() + '@example.com',
        guardianPhone: `+1 (800) 100-${String(1000 + n).slice(-4)}`,
        status: 'enrolled',
        enrolledOn: daysFromNow(-400 + n),
      });
    }
  }

  // A handful of applicants waiting on a place.
  for (let i = 0; i < 6; i += 1, n += 1) {
    const firstName = pick(FIRST, n * 5);
    const lastName = pick(LAST, n * 2);
    students.push({
      firstName,
      lastName,
      yearGroup: pick(YEAR_GROUPS, i + 1),
      guardianName: `${pick(FIRST, n + 4)} ${lastName}`,
      guardianEmail: `${firstName}.${lastName}`.toLowerCase() + '@example.com',
      guardianPhone: `+1 (800) 100-${String(2000 + i).slice(-4)}`,
      status: 'applicant',
      notes: 'Assessment day pending.',
    });
  }

  return students;
}

const ARTICLES = [
  {
    title: 'Students Win National Science Fair for Third Consecutive Year',
    category: 'Achievement',
    excerpt: 'Our Year 6 team took top honours at the National Junior Science Fair, beating over 200 schools with their water purification project.',
    body: 'A team of six students took top honours at the National Junior Science Fair, beating over 200 schools nationwide with their innovative water purification project.\n\nThe team spent two terms designing and testing their filter, working with our science department and a visiting engineer. The judges praised the project for combining scientific rigour with a genuine understanding of the communities it was designed to serve.',
    status: 'published',
    daysAgo: 12,
  },
  {
    title: 'Annual Cultural Day Celebrates Bilingual Heritage',
    category: 'Event',
    excerpt: 'Over 750 students, parents, and staff came together to celebrate the school’s rich bilingual culture through music, dance, food, and art.',
    body: 'Cultural Day filled the campus with music, colour and language. Every year group performed, from the Nursery’s counting song to Class 7’s bilingual drama piece.\n\nParents contributed dishes from home and the afternoon closed with the whole school singing together in both languages.',
    status: 'published',
    daysAgo: 34,
  },
  {
    title: 'New Innovation and Robotics Lab Opens Its Doors',
    category: 'School',
    excerpt: 'A state-of-the-art STEM facility gives students access to cutting-edge tools for coding, robotics, and digital making.',
    body: 'The new Innovation and Robotics Lab opened this term, giving every year group from Year 3 upwards timetabled access to robotics kits, 3D printing and a dedicated coding space.\n\nThe lab was funded through the school development plan and will also host the after-school Robotics club.',
    status: 'published',
    daysAgo: 61,
  },
  {
    title: 'Choir Wins Gold at Regional Music Competition',
    category: 'Achievement',
    excerpt: 'Our school choir brought home a gold medal at the Regional Schools Music Festival and has qualified for the national finals.',
    body: 'The 45-member choir performed two pieces, one in each of the school’s languages, and took gold in a field of eighteen schools.\n\nThey now go forward to the national finals in June. Rehearsals continue every Tuesday and Thursday.',
    status: 'published',
    daysAgo: 88,
  },
  {
    title: 'Summer Term Newsletter — Draft',
    category: 'Community',
    excerpt: 'A round-up of the term ahead for families, covering trips, assessments and the summer fair.',
    body: 'Draft for review by the leadership team before it goes out to families.\n\nSections still to confirm: trip dates for Years 4 and 5, and the summer fair stall list.',
    status: 'draft',
  },
];

const EVENTS = [
  { title: 'Open Day — Main Campus', category: 'Open Day', timeLabel: '10:00am – 1:00pm', days: 21,
    description: 'Tour the campus, meet the teaching team and see classrooms in action. No booking required.' },
  { title: 'Application Deadline — September Entry', category: 'Admissions', timeLabel: 'Closes 5:00pm', days: 45 },
  { title: 'Assessment Days', category: 'Admissions', timeLabel: 'By appointment', days: 60 },
  { title: 'Year 7 Graduation Ceremony', category: 'Celebration', timeLabel: '6:00pm – 8:00pm', days: 74 },
  { title: 'New Academic Year Begins', category: 'Term Date', timeLabel: 'All day', days: 110 },
  { title: 'Parents’ Evening — Lower Primary', category: 'Parents', timeLabel: '4:00pm – 7:00pm', days: -14 },
];

const ENQUIRIES = [
  { name: 'Amina Sow', email: 'amina.sow@example.com', phone: '+1 (800) 100-0142', campus: 'Main Campus',
    subject: 'Admissions Enquiry', status: 'pending', days: -2,
    message: 'Good morning. We are relocating in January and would like to enrol our daughter in Year 3. Could you tell us whether places are available and what the assessment day involves?' },
  { name: 'Daniel Okoye', email: 'd.okoye@example.com', phone: '+1 (800) 100-0155', campus: 'Main Campus',
    subject: 'Open Day', status: 'pending', days: -3,
    message: 'Is booking required for the next open day, and is it suitable to bring a three-year-old?' },
  { name: 'Grace Adeyemi', email: 'g.adeyemi@example.com', campus: 'Main Campus',
    subject: 'Campus Information', status: 'pending', days: -5,
    message: 'Could you send details of the school day timings and whether after-school care is available?' },
  { name: 'Claire Mbeki', email: 'claire.mbeki@example.com', phone: '+1 (800) 100-0161', campus: 'Main Campus',
    subject: 'Fees & Scholarships', status: 'replied', days: -9,
    message: 'We would like to understand the fee structure and whether any scholarships are offered.' },
  { name: 'Yusuf Rahman', email: 'yusuf.rahman@example.com', campus: 'Main Campus',
    subject: 'Academics & Curriculum', status: 'replied', days: -12,
    message: 'How is French taught across the year groups, and what level do children reach by Class 7?' },
  { name: 'Leila Haddad', email: 'leila.haddad@example.com', phone: '+1 (800) 100-0177', campus: 'Main Campus',
    subject: 'Admissions Enquiry', status: 'replied', days: -18,
    message: 'We are interested in a Reception place for September. What is the application process?' },
];

async function run() {
  await connectDB();

  // Anything that is not obviously demo data is left alone unless forced.
  const realLooking = await Student.countDocuments({
    guardianEmail: { $not: /@example\.com$/ },
  });
  if (realLooking > 0 && process.env.SEED_DEMO_FORCE !== 'true') {
    console.error(
      `\n  Refusing to run: this database holds ${realLooking} student record(s) that do not look like demo data.\n` +
        '  Set SEED_DEMO_FORCE=true only if you are certain you want to replace them.\n'
    );
    process.exit(1);
  }

  await Promise.all([
    Student.deleteMany({}),
    Article.deleteMany({}),
    Event.deleteMany({}),
    Enquiry.deleteMany({}),
  ]);

  const students = await Student.insertMany(buildStudents());

  const articles = await Article.insertMany(
    ARTICLES.map(({ daysAgo, ...a }) => ({
      ...a,
      publishedAt: a.status === 'published' ? daysFromNow(-daysAgo) : undefined,
      authorName: 'School Office',
    }))
  );

  const events = await Event.insertMany(
    EVENTS.map(({ days, ...e }) => ({ ...e, startsAt: daysFromNow(days), status: 'published' }))
  );

  const enquiries = await Enquiry.insertMany(
    ENQUIRIES.map(({ days, ...e }) => ({ ...e, createdAt: daysFromNow(days) }))
  );

  console.log(`Students:  ${students.length}`);
  console.log(`Articles:  ${articles.length} (${articles.filter((a) => a.status === 'published').length} published)`);
  console.log(`Events:    ${events.length}`);
  console.log(`Enquiries: ${enquiries.length} (${enquiries.filter((e) => e.status === 'pending').length} pending)`);
  console.log('\nDemo data loaded. Open /admin/overview.');
}

try {
  await run();
} catch (err) {
  console.error(`Seeding failed: ${err.message}`);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}

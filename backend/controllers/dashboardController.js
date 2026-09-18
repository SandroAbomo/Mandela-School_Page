import Enquiry from '../models/Enquiry.js';
import Student, { YEAR_GROUPS } from '../models/Student.js';
import Article from '../models/Article.js';
import Event from '../models/Event.js';

/**
 * Everything the overview screen needs, in one round trip.
 *
 * The counts run as parallel aggregations in the database rather than by
 * loading records and tallying them in Node, so the page costs the same
 * whether the school has 70 students or 7,000.
 */
export async function getOverview(req, res) {
  try {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const [
      enquiriesPending,
      enquiriesTotal,
      enquiriesThisMonth,
      studentsEnrolled,
      studentApplicants,
      byYearGroup,
      articlesPublished,
      articlesDraft,
      upcomingEvents,
      recentEnquiries,
    ] = await Promise.all([
      Enquiry.countDocuments({ status: 'pending' }),
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ createdAt: { $gte: startOfMonth } }),
      Student.countDocuments({ status: 'enrolled' }),
      Student.countDocuments({ status: 'applicant' }),
      Student.aggregate([
        { $match: { status: 'enrolled' } },
        { $group: { _id: '$yearGroup', count: { $sum: 1 } } },
      ]),
      Article.countDocuments({ status: 'published' }),
      Article.countDocuments({ status: 'draft' }),
      Event.find({ status: 'published', startsAt: { $gte: now } })
        .sort({ startsAt: 1 })
        .limit(4)
        .lean(),
      Enquiry.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    // Aggregation only returns year groups that have students; the roster chart
    // needs every year group present, including the empty ones.
    const counts = Object.fromEntries(byYearGroup.map((g) => [g._id, g.count]));
    const yearGroups = YEAR_GROUPS.map((name) => ({ name, count: counts[name] || 0 }));

    res.json({
      enquiries: {
        pending: enquiriesPending,
        total: enquiriesTotal,
        thisMonth: enquiriesThisMonth,
      },
      students: {
        enrolled: studentsEnrolled,
        applicants: studentApplicants,
        yearGroups,
      },
      content: {
        published: articlesPublished,
        drafts: articlesDraft,
      },
      upcomingEvents,
      recentEnquiries,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

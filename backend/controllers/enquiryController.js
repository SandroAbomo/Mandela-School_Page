import Enquiry from '../models/Enquiry.js';
import { sendReply, notifyAdmin } from '../services/emailService.js';

export async function createEnquiry(req, res) {
  try {
    const { name, email, subject, message } = req.body;
    const enquiry = await Enquiry.create({ name, email, subject, message });
    notifyAdmin(enquiry).catch(console.error);
    res.status(201).json(enquiry);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function getEnquiries(req, res) {
  try {
    const { search = '', status = '', page = 1 } = req.query;
    const limit = 10;
    const filter = {};

    if (status) filter.status = status;
    if (search) {
      filter.$or = [
        { name:    { $regex: search, $options: 'i' } },
        { email:   { $regex: search, $options: 'i' } },
        { subject: { $regex: search, $options: 'i' } },
      ];
    }

    const [enquiries, total] = await Promise.all([
      Enquiry.find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      Enquiry.countDocuments(filter),
    ]);

    res.json({ enquiries, totalPages: Math.ceil(total / limit) || 1, total });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getStats(req, res) {
  try {
    const [total, pending, replied] = await Promise.all([
      Enquiry.countDocuments(),
      Enquiry.countDocuments({ status: 'pending' }),
      Enquiry.countDocuments({ status: 'replied' }),
    ]);
    res.json({ total, pending, replied });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getEnquiry(req, res) {
  try {
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) return res.status(404).json({ error: 'Not found' });
    res.json(enquiry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function updateEnquiry(req, res) {
  try {
    const { reply, status } = req.body;
    const enquiry = await Enquiry.findById(req.params.id);
    if (!enquiry) return res.status(404).json({ error: 'Not found' });

    if (reply) {
      await sendReply({
        to: enquiry.email,
        name: enquiry.name,
        subject: enquiry.subject,
        reply,
      });
      enquiry.status = 'replied';
    }
    if (status && !reply) enquiry.status = status;

    await enquiry.save();
    res.json(enquiry);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

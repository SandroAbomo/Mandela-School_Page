import Event from '../models/Event.js';

/** Public feed: published events that have not already happened. */
export async function listUpcomingEvents(req, res) {
  try {
    const limit = Math.min(Number(req.query.limit) || 10, 50);
    const events = await Event.find({
      status: 'published',
      startsAt: { $gte: new Date() },
    })
      .sort({ startsAt: 1 })
      .limit(limit)
      .select('title category description startsAt timeLabel location')
      .lean();
    res.json({ events });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/** Staff view: drafts and past events included. */
export async function listEvents(req, res) {
  try {
    const events = await Event.find().sort({ startsAt: -1 }).limit(100);
    res.json({ events });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getEvent(req, res) {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ error: 'Not found' });
    res.json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function createEvent(req, res) {
  try {
    res.status(201).json(await Event.create(req.body));
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateEvent(req, res) {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!event) return res.status(404).json({ error: 'Not found' });
    res.json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteEvent(req, res) {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

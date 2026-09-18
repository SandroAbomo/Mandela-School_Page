import mongoose from 'mongoose';

export const EVENT_CATEGORIES = [
  'Open Day',
  'Admissions',
  'Term Date',
  'Celebration',
  'Parents',
];

const eventSchema = new mongoose.Schema(
  {
    title:       { type: String, required: true, trim: true },
    category:    { type: String, required: true, enum: EVENT_CATEGORIES, default: 'Open Day' },
    description: { type: String, trim: true },

    startsAt: { type: Date, required: true },
    // Free text rather than a second Date: most school listings read
    // "10:00am – 1:00pm" or "All day", which a time field cannot express.
    timeLabel: { type: String, trim: true },
    location:  { type: String, trim: true, default: 'Main Campus' },

    status: { type: String, enum: ['draft', 'published'], default: 'published' },
  },
  { timestamps: true }
);

eventSchema.index({ status: 1, startsAt: 1 });

export default mongoose.model('Event', eventSchema);

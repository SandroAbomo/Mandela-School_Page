import mongoose from 'mongoose';

export const YEAR_GROUPS = [
  'Nursery',
  'Reception',
  'Year 1',
  'Year 2',
  'Year 3',
  'Year 4',
  'Year 5',
  'Year 6',
  'Year 7',
];

const studentSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName:  { type: String, required: true, trim: true },
    yearGroup: { type: String, required: true, enum: YEAR_GROUPS },

    guardianName:  { type: String, required: true, trim: true },
    guardianEmail: { type: String, required: true, trim: true, lowercase: true },
    guardianPhone: { type: String, trim: true },

    // 'applicant' covers a child who has been offered a place but has not started,
    // so the roster and the admissions pipeline stay in one list.
    status: {
      type: String,
      enum: ['applicant', 'enrolled', 'alumni'],
      default: 'enrolled',
    },
    enrolledOn: { type: Date, default: Date.now },
    notes:      { type: String, trim: true },
  },
  { timestamps: true }
);

studentSchema.virtual('fullName').get(function () {
  return `${this.firstName} ${this.lastName}`;
});

studentSchema.set('toJSON', { virtuals: true });

// Backs the roster search box.
studentSchema.index({ lastName: 1, firstName: 1 });

export default mongoose.model('Student', studentSchema);

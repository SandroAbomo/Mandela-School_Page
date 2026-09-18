import mongoose from 'mongoose';

export const ARTICLE_CATEGORIES = ['Achievement', 'Event', 'School', 'Community'];

const articleSchema = new mongoose.Schema(
  {
    title:    { type: String, required: true, trim: true },
    category: { type: String, required: true, enum: ARTICLE_CATEGORIES, default: 'School' },
    excerpt:  { type: String, required: true, trim: true },
    body:     { type: String, required: true, trim: true },

    // Drafts are invisible to the public site; only 'published' is ever served
    // to parents, so staff can write ahead of an announcement.
    status:      { type: String, enum: ['draft', 'published'], default: 'draft' },
    publishedAt: { type: Date },

    authorName: { type: String, trim: true },
  },
  { timestamps: true }
);

// Publishing stamps the date once, so re-saving a published article does not
// keep bumping it to the top of the public list.
articleSchema.pre('save', function () {
  if (this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }
  if (this.status === 'draft') {
    this.publishedAt = undefined;
  }
});

articleSchema.index({ status: 1, publishedAt: -1 });

export default mongoose.model('Article', articleSchema);

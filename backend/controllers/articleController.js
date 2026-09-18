import Article from '../models/Article.js';

/**
 * Public feed for the website. Only published articles ever leave this handler,
 * so an unfinished draft cannot reach parents through the API.
 */
export async function listPublishedArticles(req, res) {
  try {
    const limit = Math.min(Number(req.query.limit) || 20, 50);
    const articles = await Article.find({ status: 'published' })
      .sort({ publishedAt: -1 })
      .limit(limit)
      .select('title category excerpt body publishedAt')
      .lean();
    res.json({ articles });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/** Staff view: drafts included. */
export async function listArticles(req, res) {
  try {
    const { status = '' } = req.query;
    const filter = status ? { status } : {};
    const articles = await Article.find(filter)
      .sort({ updatedAt: -1 })
      .limit(100);
    res.json({ articles });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function getArticle(req, res) {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: 'Not found' });
    res.json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function createArticle(req, res) {
  try {
    const article = new Article({ ...req.body, authorName: req.body.authorName || req.user?.name });
    await article.save();
    res.status(201).json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateArticle(req, res) {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) return res.status(404).json({ error: 'Not found' });

    // Assigned field by field and saved (rather than findByIdAndUpdate) so the
    // pre-save hook that stamps publishedAt actually runs.
    Object.assign(article, req.body);
    await article.save();
    res.json(article);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteArticle(req, res) {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

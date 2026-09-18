import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  fetchArticles, createArticle, updateArticle, deleteArticle,
} from '../../services/schoolAPI';
import { useAsyncData } from '../../hooks/useAsyncData';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  Button, Card, Badge, Modal, Field, Input, Select, Textarea,
  EmptyState, Loading, ErrorNote,
} from '../../components/admin/ui';

const CATEGORIES = ['Achievement', 'Event', 'School', 'Community'];
const BLANK = { title: '', category: 'School', excerpt: '', body: '', status: 'draft' };

const dateFmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export default function NewsAdmin() {
  const { token, can } = useAuth();
  const [filter, setFilter] = useState('');

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(BLANK);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const { data, loading, error, reload, setError } = useAsyncData(
    () => fetchArticles(token, { status: filter }),
    [token, filter]
  );

  const articles = data?.articles ?? [];

  function openNew() { setForm(BLANK); setFormError(''); setEditing({}); }

  function openEdit(a) {
    setForm({ title: a.title, category: a.category, excerpt: a.excerpt, body: a.body, status: a.status });
    setFormError('');
    setEditing(a);
  }

  async function save(e, overrideStatus) {
    e.preventDefault();
    setSaving(true);
    setFormError('');
    const payload = overrideStatus ? { ...form, status: overrideStatus } : form;
    try {
      if (editing._id) await updateArticle(token, editing._id, payload);
      else await createArticle(token, payload);
      setEditing(null);
      reload();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  }

  /** Publish/unpublish straight from the list — the most common single action. */
  async function toggleStatus(a) {
    try {
      await updateArticle(token, a._id, { status: a.status === 'published' ? 'draft' : 'published' });
      reload();
    } catch (err) { setError(err.message); }
  }

  async function remove(a) {
    if (!window.confirm(`Delete “${a.title}”? This cannot be undone.`)) return;
    try {
      await deleteArticle(token, a._id);
      reload();
    } catch (err) { setError(err.message); }
  }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const published = articles.filter((a) => a.status === 'published').length;

  return (
    <AdminLayout
      title="News"
      subtitle={`${published} article${published === 1 ? '' : 's'} live on the website`}
      actions={can.write && <Button onClick={openNew}>Write article</Button>}
    >
      <ErrorNote>{error}</ErrorNote>

      <div className="flex items-center gap-2 mb-4">
        {[
          { v: '', label: 'All' },
          { v: 'published', label: 'Published' },
          { v: 'draft', label: 'Drafts' },
        ].map(({ v, label }) => (
          <button
            key={v}
            onClick={() => setFilter(v)}
            className={`px-3.5 py-2 rounded-lg text-sm font-semibold transition-colors ${
              filter === v ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-slate-600 hover:bg-school-off-white'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {loading ? (
        <Loading label="Loading articles…" />
      ) : articles.length === 0 ? (
        <EmptyState
          title={filter ? `No ${filter} articles` : 'No articles yet'}
          description="Anything published here appears on the school's public News page and on the homepage straight away."
          action={can.write && !filter && <Button onClick={openNew}>Write the first article</Button>}
        />
      ) : (
        <div className="space-y-3">
          {articles.map((a) => (
            <Card key={a._id} className="p-5">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Badge value={a.status} />
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                      {a.category}
                    </span>
                    {a.publishedAt && (
                      <span className="text-xs text-slate-400">
                        · {dateFmt.format(new Date(a.publishedAt))}
                      </span>
                    )}
                  </div>
                  <h3 className="font-bold text-school-black leading-snug">{a.title}</h3>
                  <p className="text-sm text-slate-500 mt-1.5 line-clamp-2">{a.excerpt}</p>
                </div>
                {can.write && (
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Button variant="secondary" onClick={() => toggleStatus(a)}>
                      {a.status === 'published' ? 'Unpublish' : 'Publish'}
                    </Button>
                    <Button variant="secondary" onClick={() => openEdit(a)}>Edit</Button>
                    <Button variant="danger" onClick={() => remove(a)}>Delete</Button>
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      <Modal
        open={editing !== null}
        title={editing?._id ? 'Edit article' : 'Write article'}
        onClose={() => setEditing(null)}
        footer={
          <>
            <Button variant="secondary" type="button" onClick={() => setEditing(null)}>Cancel</Button>
            <Button variant="secondary" type="button" disabled={saving} onClick={(e) => save(e, 'draft')}>
              Save draft
            </Button>
            <Button type="button" disabled={saving} onClick={(e) => save(e, 'published')}>
              {saving ? 'Saving…' : 'Publish'}
            </Button>
          </>
        }
      >
        <form id="article-form" onSubmit={save} className="space-y-4">
          <ErrorNote>{formError}</ErrorNote>
          <Field label="Headline">
            <Input value={form.title} onChange={set('title')} required />
          </Field>
          <Field label="Category">
            <Select value={form.category} onChange={set('category')}>
              {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
            </Select>
          </Field>
          <Field label="Summary" hint="Shown on the homepage and in the news list.">
            <Textarea rows={2} value={form.excerpt} onChange={set('excerpt')} required />
          </Field>
          <Field label="Full article">
            <Textarea rows={6} value={form.body} onChange={set('body')} required />
          </Field>
        </form>
      </Modal>
    </AdminLayout>
  );
}

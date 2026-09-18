import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  fetchEvents, createEvent, updateEvent, deleteEvent,
} from '../../services/schoolAPI';
import { useAsyncData } from '../../hooks/useAsyncData';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  Button, Card, Badge, Modal, Field, Input, Select, Textarea,
  EmptyState, Loading, ErrorNote,
} from '../../components/admin/ui';

const CATEGORIES = ['Open Day', 'Admissions', 'Term Date', 'Celebration', 'Parents'];

const BLANK = {
  title: '', category: 'Open Day', description: '',
  startsAt: '', timeLabel: '', location: 'Main Campus', status: 'published',
};

const dateFmt = new Intl.DateTimeFormat('en-GB', {
  weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
});

/** <input type="date"> needs yyyy-mm-dd; the API returns an ISO timestamp. */
const toDateInput = (iso) => (iso ? new Date(iso).toISOString().slice(0, 10) : '');

export default function EventsAdmin() {
  const { token, can } = useAuth();

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(BLANK);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const { data, loading, error, reload, setError } = useAsyncData(
    () => fetchEvents(token),
    [token]
  );

  const events = data?.events ?? [];

  function openNew() { setForm(BLANK); setFormError(''); setEditing({}); }

  function openEdit(ev) {
    setForm({
      title: ev.title, category: ev.category, description: ev.description || '',
      startsAt: toDateInput(ev.startsAt), timeLabel: ev.timeLabel || '',
      location: ev.location || 'Main Campus', status: ev.status,
    });
    setFormError('');
    setEditing(ev);
  }

  async function save(e) {
    e.preventDefault();
    setSaving(true);
    setFormError('');
    try {
      if (editing._id) await updateEvent(token, editing._id, form);
      else await createEvent(token, form);
      setEditing(null);
      reload();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function remove(ev) {
    if (!window.confirm(`Delete “${ev.title}”? This cannot be undone.`)) return;
    try {
      await deleteEvent(token, ev._id);
      reload();
    } catch (err) { setError(err.message); }
  }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const now = new Date();
  const upcoming = events.filter((e) => new Date(e.startsAt) >= now);
  const past = events.filter((e) => new Date(e.startsAt) < now);

  const row = (ev, isPast) => (
    <Card key={ev._id} className={`p-5 ${isPast ? 'opacity-60' : ''}`}>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="flex gap-4 min-w-0 flex-1">
          <div className="w-16 flex-shrink-0 text-center bg-school-off-white rounded-lg py-2">
            <p className="text-primary font-bold text-sm leading-tight">
              {new Date(ev.startsAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
            </p>
            <p className="text-[11px] text-slate-500">
              {new Date(ev.startsAt).getFullYear()}
            </p>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <Badge value={ev.status} />
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                {ev.category}
              </span>
            </div>
            <h3 className="font-bold text-school-black leading-snug">{ev.title}</h3>
            <p className="text-xs text-slate-500 mt-1">
              {dateFmt.format(new Date(ev.startsAt))}
              {ev.timeLabel ? ` · ${ev.timeLabel}` : ''}
              {ev.location ? ` · ${ev.location}` : ''}
            </p>
            {ev.description && (
              <p className="text-sm text-slate-500 mt-1.5 line-clamp-2">{ev.description}</p>
            )}
          </div>
        </div>
        {can.write && (
          <div className="flex items-center gap-2 flex-shrink-0">
            <Button variant="secondary" onClick={() => openEdit(ev)}>Edit</Button>
            <Button variant="danger" onClick={() => remove(ev)}>Delete</Button>
          </div>
        )}
      </div>
    </Card>
  );

  return (
    <AdminLayout
      title="Events"
      subtitle={`${upcoming.length} upcoming · shown on the website`}
      actions={can.write && <Button onClick={openNew}>Add event</Button>}
    >
      <ErrorNote>{error}</ErrorNote>

      {loading ? (
        <Loading label="Loading events…" />
      ) : events.length === 0 ? (
        <EmptyState
          title="No events scheduled"
          description="Published events appear on the school's News page and in the overview. Open days, term dates and assessment days all belong here."
          action={can.write && <Button onClick={openNew}>Add the first event</Button>}
        />
      ) : (
        <div className="space-y-6">
          <div>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
              Upcoming
            </h2>
            {upcoming.length === 0 ? (
              <p className="text-sm text-slate-500 bg-white border border-dashed border-gray-200 rounded-xl px-5 py-8 text-center">
                Nothing upcoming — the website&rsquo;s events list is currently empty.
              </p>
            ) : (
              <div className="space-y-3">{upcoming.map((e) => row(e, false))}</div>
            )}
          </div>

          {past.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3">
                Past
              </h2>
              <div className="space-y-3">{past.map((e) => row(e, true))}</div>
            </div>
          )}
        </div>
      )}

      <Modal
        open={editing !== null}
        title={editing?._id ? 'Edit event' : 'Add event'}
        onClose={() => setEditing(null)}
        footer={
          <>
            <Button variant="secondary" type="button" onClick={() => setEditing(null)}>Cancel</Button>
            <Button type="submit" form="event-form" disabled={saving}>
              {saving ? 'Saving…' : 'Save event'}
            </Button>
          </>
        }
      >
        <form id="event-form" onSubmit={save} className="space-y-4">
          <ErrorNote>{formError}</ErrorNote>
          <Field label="Event name"><Input value={form.title} onChange={set('title')} required /></Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Date">
              <Input type="date" value={form.startsAt} onChange={set('startsAt')} required />
            </Field>
            <Field label="Category">
              <Select value={form.category} onChange={set('category')}>
                {CATEGORIES.map((c) => <option key={c}>{c}</option>)}
              </Select>
            </Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Time" hint="e.g. 10:00am – 1:00pm">
              <Input value={form.timeLabel} onChange={set('timeLabel')} placeholder="All day" />
            </Field>
            <Field label="Location"><Input value={form.location} onChange={set('location')} /></Field>
          </div>
          <Field label="Description" hint="Optional. Shown to parents on the website.">
            <Textarea rows={3} value={form.description} onChange={set('description')} />
          </Field>
          <Field label="Visibility">
            <Select value={form.status} onChange={set('status')}>
              <option value="published">Published — visible on the website</option>
              <option value="draft">Draft — staff only</option>
            </Select>
          </Field>
        </form>
      </Modal>
    </AdminLayout>
  );
}

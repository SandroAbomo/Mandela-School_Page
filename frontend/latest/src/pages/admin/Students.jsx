import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  fetchStudents, createStudent, updateStudent, deleteStudent,
} from '../../services/schoolAPI';
import { useAsyncData } from '../../hooks/useAsyncData';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  Button, Card, Badge, Modal, Field, Input, Select, Textarea,
  EmptyState, Loading, ErrorNote,
} from '../../components/admin/ui';

const YEAR_GROUPS = ['Nursery', 'Reception', 'Year 1', 'Year 2', 'Year 3', 'Year 4', 'Year 5', 'Year 6', 'Year 7'];
const STATUSES = ['enrolled', 'applicant', 'alumni'];

const BLANK = {
  firstName: '', lastName: '', yearGroup: 'Reception',
  guardianName: '', guardianEmail: '', guardianPhone: '',
  status: 'enrolled', notes: '',
};

export default function Students() {
  const { token, can } = useAuth();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [yearGroup, setYearGroup] = useState('');
  const [status, setStatus] = useState('');

  const [editing, setEditing] = useState(null); // null = closed, {} = new
  const [form, setForm] = useState(BLANK);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const { data, loading, error, reload, setError } = useAsyncData(
    () => fetchStudents(token, { search, yearGroup, status, page }),
    [token, search, yearGroup, status, page]
  );

  const rows = data?.students ?? [];
  const total = data?.total ?? 0;
  const totalPages = data?.totalPages ?? 1;

  function openNew() {
    setForm(BLANK);
    setFormError('');
    setEditing({});
  }

  function openEdit(student) {
    setForm({
      firstName: student.firstName, lastName: student.lastName,
      yearGroup: student.yearGroup, guardianName: student.guardianName,
      guardianEmail: student.guardianEmail, guardianPhone: student.guardianPhone || '',
      status: student.status, notes: student.notes || '',
    });
    setFormError('');
    setEditing(student);
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setFormError('');
    try {
      if (editing._id) await updateStudent(token, editing._id, form);
      else await createStudent(token, form);
      setEditing(null);
      reload();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(student) {
    if (!window.confirm(`Remove ${student.firstName} ${student.lastName} from the roster? This cannot be undone.`)) return;
    try {
      await deleteStudent(token, student._id);
      reload();
    } catch (err) {
      setError(err.message);
    }
  }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  const resetPage = (fn) => (e) => { fn(e.target.value); setPage(1); };

  return (
    <AdminLayout
      title="Students"
      subtitle={`${total} record${total === 1 ? '' : 's'} on file`}
      actions={can.write && <Button onClick={openNew}>Add student</Button>}
    >
      <ErrorNote>{error}</ErrorNote>

      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <input
          type="search"
          value={search}
          onChange={resetPage(setSearch)}
          placeholder="Search student or guardian…"
          className="flex-1 border border-gray-200 bg-white px-4 py-2.5 text-sm rounded-lg focus:outline-none focus:border-primary transition-colors"
        />
        <Select value={yearGroup} onChange={resetPage(setYearGroup)} className="sm:w-48">
          <option value="">All year groups</option>
          {YEAR_GROUPS.map((y) => <option key={y}>{y}</option>)}
        </Select>
        <Select value={status} onChange={resetPage(setStatus)} className="sm:w-44">
          <option value="">All statuses</option>
          {STATUSES.map((s) => <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>)}
        </Select>
      </div>

      {loading ? (
        <Loading label="Loading roster…" />
      ) : rows.length === 0 ? (
        <EmptyState
          title={search || yearGroup || status ? 'No students match those filters' : 'No students on the roll yet'}
          description={
            search || yearGroup || status
              ? 'Try clearing the search or filters.'
              : 'Add your first student to start building the roster. Year-group totals on the overview update automatically.'
          }
          action={can.write && !(search || yearGroup || status) && <Button onClick={openNew}>Add student</Button>}
        />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-school-off-white border-b border-gray-100">
                  {['Student', 'Year group', 'Guardian', 'Status', ''].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-600">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {rows.map((s) => (
                  <tr key={s._id} className="border-b border-gray-50 last:border-0 hover:bg-school-off-white transition-colors">
                    <td className="px-4 py-3 font-medium text-school-black">
                      {s.firstName} {s.lastName}
                    </td>
                    <td className="px-4 py-3 text-slate-600">{s.yearGroup}</td>
                    <td className="px-4 py-3 text-slate-600">
                      <span className="block">{s.guardianName}</span>
                      <span className="block text-xs text-slate-500">{s.guardianEmail}</span>
                    </td>
                    <td className="px-4 py-3"><Badge value={s.status} /></td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      {can.write ? (
                        <>
                          <button onClick={() => openEdit(s)} className="text-primary font-semibold text-xs hover:underline">
                            Edit
                          </button>
                          <button onClick={() => handleDelete(s)} className="ml-3 text-red-600 font-semibold text-xs hover:underline">
                            Remove
                          </button>
                        </>
                      ) : (
                        <span className="text-xs text-slate-400">View only</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      {totalPages > 1 && (
        <div className="mt-5 flex items-center justify-between">
          <Button variant="secondary" disabled={page === 1} onClick={() => setPage((p) => p - 1)}>
            ← Previous
          </Button>
          <span className="text-sm text-slate-500">Page {page} of {totalPages}</span>
          <Button variant="secondary" disabled={page === totalPages} onClick={() => setPage((p) => p + 1)}>
            Next →
          </Button>
        </div>
      )}

      <Modal
        open={editing !== null}
        title={editing?._id ? 'Edit student' : 'Add student'}
        onClose={() => setEditing(null)}
        footer={
          <>
            <Button variant="secondary" type="button" onClick={() => setEditing(null)}>Cancel</Button>
            <Button type="submit" form="student-form" disabled={saving}>
              {saving ? 'Saving…' : 'Save student'}
            </Button>
          </>
        }
      >
        <form id="student-form" onSubmit={handleSave} className="space-y-4">
          <ErrorNote>{formError}</ErrorNote>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="First name"><Input value={form.firstName} onChange={set('firstName')} required /></Field>
            <Field label="Last name"><Input value={form.lastName} onChange={set('lastName')} required /></Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Year group">
              <Select value={form.yearGroup} onChange={set('yearGroup')}>
                {YEAR_GROUPS.map((y) => <option key={y}>{y}</option>)}
              </Select>
            </Field>
            <Field label="Status">
              <Select value={form.status} onChange={set('status')}>
                {STATUSES.map((s) => <option key={s} value={s}>{s[0].toUpperCase() + s.slice(1)}</option>)}
              </Select>
            </Field>
          </div>
          <Field label="Guardian name"><Input value={form.guardianName} onChange={set('guardianName')} required /></Field>
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Guardian email"><Input type="email" value={form.guardianEmail} onChange={set('guardianEmail')} required /></Field>
            <Field label="Guardian phone"><Input value={form.guardianPhone} onChange={set('guardianPhone')} /></Field>
          </div>
          <Field label="Notes" hint="Internal only — never shown on the website.">
            <Textarea rows={3} value={form.notes} onChange={set('notes')} />
          </Field>
        </form>
      </Modal>
    </AdminLayout>
  );
}

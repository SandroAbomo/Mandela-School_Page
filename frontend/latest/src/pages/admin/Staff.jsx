import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetchUsers, createUser, updateUser, deleteUser } from '../../services/schoolAPI';
import { useAsyncData } from '../../hooks/useAsyncData';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  Button, Card, Badge, Modal, Field, Input, Select,
  EmptyState, Loading, ErrorNote,
} from '../../components/admin/ui';

const ROLES = [
  { value: 'headteacher', label: 'Headteacher', desc: 'Full access, including staff accounts' },
  { value: 'admin', label: 'Office Admin', desc: 'Enquiries, students, news and events' },
  { value: 'teacher', label: 'Teacher', desc: 'Read-only; cannot see enquiries' },
];

const BLANK = { name: '', email: '', password: '', role: 'teacher' };

const dateFmt = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export default function Staff() {
  const { token, user: current } = useAuth();

  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(BLANK);
  const [saving, setSaving] = useState(false);
  const [formError, setFormError] = useState('');

  const { data, loading, error, reload, setError } = useAsyncData(
    () => fetchUsers(token),
    [token]
  );

  const users = data?.users ?? [];

  function openNew() { setForm(BLANK); setFormError(''); setEditing({}); }

  function openEdit(u) {
    // Password is left blank on edit: filling it in sets a new one, leaving it
    // alone keeps the existing password.
    setForm({ name: u.name || '', email: u.email, password: '', role: u.role });
    setFormError('');
    setEditing(u);
  }

  async function save(e) {
    e.preventDefault();
    setSaving(true);
    setFormError('');
    try {
      if (editing._id) {
        const payload = { name: form.name, role: form.role };
        if (form.password) payload.password = form.password;
        await updateUser(token, editing._id, payload);
      } else {
        await createUser(token, form);
      }
      setEditing(null);
      reload();
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSaving(false);
    }
  }

  async function toggleActive(u) {
    try {
      await updateUser(token, u._id, { active: !u.active });
      reload();
    } catch (err) { setError(err.message); }
  }

  async function remove(u) {
    if (!window.confirm(`Delete the account for ${u.email}? Deactivating is usually safer.`)) return;
    try {
      await deleteUser(token, u._id);
      reload();
    } catch (err) { setError(err.message); }
  }

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <AdminLayout
      title="Staff accounts"
      subtitle="Who can sign in, and what they are allowed to do"
      actions={<Button onClick={openNew}>Add staff member</Button>}
    >
      <ErrorNote>{error}</ErrorNote>

      <Card className="p-5 mb-5 bg-school-off-white">
        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-600 mb-3">
          What each role can do
        </h2>
        <ul className="grid sm:grid-cols-3 gap-4">
          {ROLES.map((r) => (
            <li key={r.value}>
              <p className="font-bold text-school-black text-sm">{r.label}</p>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{r.desc}</p>
            </li>
          ))}
        </ul>
      </Card>

      {loading ? (
        <Loading label="Loading staff…" />
      ) : users.length === 0 ? (
        <EmptyState title="No staff accounts" description="Add an account so colleagues can sign in." />
      ) : (
        <Card className="overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-school-off-white border-b border-gray-100">
                  {['Name', 'Email', 'Role', 'Status', 'Last signed in', ''].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-600">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.map((u) => {
                  const isSelf = current?.id === u._id;
                  return (
                    <tr key={u._id} className="border-b border-gray-50 last:border-0 hover:bg-school-off-white transition-colors">
                      <td className="px-4 py-3 font-medium text-school-black">
                        {u.name || '—'}
                        {isSelf && <span className="ml-2 text-xs text-slate-400">(you)</span>}
                      </td>
                      <td className="px-4 py-3 text-slate-600">{u.email}</td>
                      <td className="px-4 py-3"><Badge value={u.role} /></td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold ${u.active ? 'text-green-700' : 'text-slate-400'}`}>
                          {u.active ? 'Active' : 'Deactivated'}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-500 text-xs">
                        {u.lastLogin ? dateFmt.format(new Date(u.lastLogin)) : 'Never'}
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <button onClick={() => openEdit(u)} className="text-primary font-semibold text-xs hover:underline">
                          Edit
                        </button>
                        {!isSelf && (
                          <>
                            <button onClick={() => toggleActive(u)} className="ml-3 text-slate-600 font-semibold text-xs hover:underline">
                              {u.active ? 'Deactivate' : 'Reactivate'}
                            </button>
                            <button onClick={() => remove(u)} className="ml-3 text-red-600 font-semibold text-xs hover:underline">
                              Delete
                            </button>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Card>
      )}

      <Modal
        open={editing !== null}
        title={editing?._id ? 'Edit staff member' : 'Add staff member'}
        onClose={() => setEditing(null)}
        footer={
          <>
            <Button variant="secondary" type="button" onClick={() => setEditing(null)}>Cancel</Button>
            <Button type="submit" form="staff-form" disabled={saving}>
              {saving ? 'Saving…' : 'Save'}
            </Button>
          </>
        }
      >
        <form id="staff-form" onSubmit={save} className="space-y-4">
          <ErrorNote>{formError}</ErrorNote>
          <Field label="Full name"><Input value={form.name} onChange={set('name')} /></Field>
          <Field label="Email">
            <Input
              type="email"
              value={form.email}
              onChange={set('email')}
              required
              disabled={Boolean(editing?._id)}
            />
          </Field>
          <Field
            label={editing?._id ? 'New password' : 'Password'}
            hint={editing?._id ? 'Leave blank to keep the current password.' : 'Minimum 12 characters.'}
          >
            <Input
              type="password"
              value={form.password}
              onChange={set('password')}
              required={!editing?._id}
              minLength={12}
            />
          </Field>
          <Field label="Role">
            <Select value={form.role} onChange={set('role')}>
              {ROLES.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}
            </Select>
          </Field>
        </form>
      </Modal>
    </AdminLayout>
  );
}

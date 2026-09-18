import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { fetchEnquiry, updateEnquiry } from '../../services/enquiryAPI';
import AdminLayout from '../../components/admin/AdminLayout';
import {
  Card, Badge, Button, Textarea, Field, Loading, ErrorNote,
} from '../../components/admin/ui';

export default function EnquiryDetail() {
  const { id } = useParams();
  const { token, can } = useAuth();
  const navigate = useNavigate();
  const [enquiry, setEnquiry] = useState(null);
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEnquiry(token, id)
      .then(setEnquiry)
      .catch((e) => setError(e.message));
  }, [token, id]);

  async function handleReply(e) {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      const updated = await updateEnquiry(token, id, { reply, status: 'replied' });
      setEnquiry(updated);
      setSent(true);
      setReply('');
    } catch (err) {
      // The status only moves once the email is actually sent, so a failure
      // here leaves the enquiry pending and it stays in the queue.
      setError(`${err.message} — the enquiry is still marked pending.`);
    } finally {
      setSending(false);
    }
  }

  if (!enquiry) {
    return (
      <AdminLayout title="Enquiry" subtitle="Admissions inbox">
        <ErrorNote>{error}</ErrorNote>
        {!error && <Loading label="Loading enquiry…" />}
      </AdminLayout>
    );
  }

  const detail = (label, value) =>
    value ? (
      <div>
        <dt className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">{label}</dt>
        <dd className="text-school-black">{value}</dd>
      </div>
    ) : null;

  return (
    <AdminLayout
      title={enquiry.subject}
      subtitle={`From ${enquiry.name}`}
      actions={
        <Button variant="secondary" onClick={() => navigate('/admin/enquiries')}>
          ← All enquiries
        </Button>
      }
    >
      <ErrorNote>{error}</ErrorNote>

      <div className="max-w-3xl space-y-5">
        <Card className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 mb-6">
            <h2 className="text-lg font-bold text-school-black leading-snug">{enquiry.subject}</h2>
            <Badge value={enquiry.status} />
          </div>

          <dl className="grid sm:grid-cols-2 gap-5 text-sm border-t border-gray-100 pt-6">
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-1">From</dt>
              <dd className="text-school-black">{enquiry.name}</dd>
              <dd>
                <a href={`mailto:${enquiry.email}`} className="text-primary hover:underline">
                  {enquiry.email}
                </a>
              </dd>
            </div>
            {detail('Phone', enquiry.phone)}
            {detail('Campus preference', enquiry.campus)}
            {detail('Received', new Date(enquiry.createdAt).toLocaleString('en-GB'))}
          </dl>

          <div className="mt-6 border-t border-gray-100 pt-6">
            <h3 className="text-xs font-bold uppercase tracking-wide text-slate-500 mb-3">Message</h3>
            <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
              {enquiry.message}
            </p>
          </div>
        </Card>

        {enquiry.status === 'replied' ? (
          <div className="bg-green-50 border border-green-200 text-green-800 text-sm px-6 py-4 rounded-xl">
            <p className="font-semibold">This enquiry has been answered.</p>
            <p className="mt-1 text-green-700">
              A reply was emailed to {enquiry.email}.
            </p>
          </div>
        ) : !can.write ? (
          <div className="bg-school-off-white border border-gray-200 text-slate-600 text-sm px-6 py-4 rounded-xl">
            Your role does not allow sending replies.
          </div>
        ) : (
          <Card className="p-6 sm:p-8">
            <h3 className="font-bold text-school-black mb-5">Send a reply</h3>

            {sent && (
              <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 mb-5 rounded-lg">
                Reply sent successfully.
              </div>
            )}

            <form onSubmit={handleReply}>
              <Field label={`Your reply (emailed to ${enquiry.email})`}>
                <Textarea rows={7} value={reply} onChange={(e) => setReply(e.target.value)} required />
              </Field>
              <div className="mt-4 flex items-center gap-3">
                <Button type="submit" disabled={sending}>
                  {sending ? 'Sending…' : 'Send reply'}
                </Button>
                <Link to="/admin/enquiries" className="text-sm text-slate-500 hover:text-school-black">
                  Cancel
                </Link>
              </div>
            </form>
          </Card>
        )}
      </div>
    </AdminLayout>
  );
}

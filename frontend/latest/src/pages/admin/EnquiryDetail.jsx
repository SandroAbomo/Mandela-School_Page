import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { fetchEnquiry, updateEnquiry } from '../../services/enquiryAPI';
import StatusBadge from '../../components/admin/StatusBadge';

export default function EnquiryDetail() {
  const { id } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();
  const [enquiry, setEnquiry] = useState(null);
  const [reply, setReply] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    fetchEnquiry(token, id).then(setEnquiry).catch(console.error);
  }, [token, id]);

  async function handleReply(e) {
    e.preventDefault();
    setSending(true);
    try {
      const updated = await updateEnquiry(token, id, { reply, status: 'replied' });
      setEnquiry(updated);
      setSent(true);
      setReply('');
    } catch (err) {
      console.error(err);
    } finally {
      setSending(false);
    }
  }

  if (!enquiry) {
    return (
      <div className="min-h-screen bg-school-off-white flex items-center justify-center">
        <p className="text-slate-700 text-sm">Loading enquiry…</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-school-off-white">
      <header className="bg-school-black px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-6 h-0.5 bg-primary" />
          <span className="text-white font-bold text-sm uppercase tracking-widest">Admin — Mandela Bilingual</span>
        </div>
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="text-xs text-slate-700 hover:text-white transition-colors uppercase tracking-wide font-semibold"
        >
          ← Dashboard
        </button>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <button
          onClick={() => navigate('/admin/dashboard')}
          className="text-sm font-semibold text-slate-500 hover:text-school-black transition-colors mb-8 flex items-center gap-2"
        >
          ← Back to Dashboard
        </button>

        <div className="bg-white p-8 rounded-xl shadow-sm">
          <div className="flex items-start justify-between gap-4 mb-6">
            <h1 className="text-xl font-bold text-school-black leading-snug">{enquiry.subject}</h1>
            <StatusBadge status={enquiry.status} />
          </div>

          <dl className="grid sm:grid-cols-2 gap-4 text-sm border-t border-gray-100 pt-6">
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-slate-700 mb-1">From</dt>
              <dd className="text-school-black">{enquiry.name}</dd>
              <dd className="text-slate-500">{enquiry.email}</dd>
            </div>
            {enquiry.phone && (
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-slate-700 mb-1">Phone</dt>
                <dd className="text-school-black">{enquiry.phone}</dd>
              </div>
            )}
            {enquiry.campus && (
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-slate-700 mb-1">Campus Preference</dt>
                <dd className="text-school-black">{enquiry.campus}</dd>
              </div>
            )}
            <div>
              <dt className="text-xs font-bold uppercase tracking-wide text-slate-700 mb-1">Received</dt>
              <dd className="text-school-black">{new Date(enquiry.createdAt).toLocaleString()}</dd>
            </div>
          </dl>

          <div className="mt-6 border-t border-gray-100 pt-6">
            <h2 className="text-xs font-bold uppercase tracking-wide text-slate-700 mb-3">Message</h2>
            <p className="text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">{enquiry.message}</p>
          </div>
        </div>

        <div className="mt-6">
          {enquiry.status === 'replied' ? (
            <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-6 py-4 rounded-lg">
              This enquiry has already been replied to.
            </div>
          ) : (
            <form onSubmit={handleReply} className="bg-white p-8 rounded-xl shadow-sm">
              <h2 className="font-bold text-school-black mb-5">Send Reply</h2>

              {sent && (
                <div className="bg-green-50 border border-green-200 text-green-700 text-sm px-4 py-3 mb-5 rounded-lg">
                  Reply sent successfully.
                </div>
              )}

              <div>
                <label htmlFor="reply" className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1.5">
                  Your reply (sent to {enquiry.email})
                </label>
                <textarea
                  id="reply"
                  rows={6}
                  value={reply}
                  onChange={e => setReply(e.target.value)}
                  required
                  className="w-full border border-gray-200 px-4 py-3 text-sm text-school-black focus:outline-none focus:border-primary transition-colors resize-none rounded-lg"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="mt-4 bg-primary text-white px-8 py-3 text-sm font-bold uppercase tracking-wide hover:bg-primary-dark transition-colors disabled:opacity-60 rounded-lg shadow-sm"
              >
                {sending ? 'Sending…' : 'Send Reply'}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}

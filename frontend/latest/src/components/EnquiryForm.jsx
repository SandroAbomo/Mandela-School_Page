import { useState } from 'react';

const SUBJECTS = [
  'Admissions Enquiry',
  'Campus Information',
  'Academics & Curriculum',
  'Fees & Scholarships',
  'Open Day',
  'General Enquiry',
];

const INITIAL = { name: '', email: '', phone: '', subject: '', campus: 'Main Campus', message: '' };

const inputCls = 'w-full px-4 py-3 border border-gray-200 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/15 text-school-black text-sm transition rounded-lg bg-white';

export default function EnquiryForm() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState('idle');

  const handleChange = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const base = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
      const res = await fetch(`${base}/enquiries`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          campus: form.campus,
          subject: form.subject || 'General Enquiry',
          message: form.message,
        }),
      });
      if (!res.ok) throw new Error();
      setStatus('success');
      setForm(INITIAL);
    } catch {
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="bg-emerald-50 border border-emerald-100 p-10 text-center rounded-2xl">
        <p className="font-bold text-emerald-800 text-lg">Thank you for your enquiry!</p>
        <p className="text-emerald-600 text-sm mt-2">We will be in touch within two working days.</p>
        <button onClick={() => setStatus('idle')} className="mt-5 text-accent text-sm font-semibold hover:underline">
          Submit another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-1.5">Full Name *</label>
          <input type="text" name="name" required value={form.name} onChange={handleChange}
            placeholder="Your full name" className={inputCls} />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-1.5">Email Address *</label>
          <input type="email" name="email" required value={form.email} onChange={handleChange}
            placeholder="your@email.com" className={inputCls} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-1.5">Phone Number</label>
          <input type="tel" name="phone" value={form.phone} onChange={handleChange}
            placeholder="+1 (000) 000-0000" className={inputCls} />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-1.5">Campus Preference</label>
          <select name="campus" value={form.campus} onChange={handleChange} className={inputCls}>
            <option value="Main Campus">Main Campus</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-1.5">Subject *</label>
        <select name="subject" required value={form.subject} onChange={handleChange} className={inputCls}>
          <option value="">Select a subject</option>
          {SUBJECTS.map((s) => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wide text-slate-700 mb-1.5">Message *</label>
        <textarea name="message" required rows={5} value={form.message} onChange={handleChange}
          placeholder="Tell us what you'd like to know..."
          className={`${inputCls} resize-none`} />
      </div>

      {status === 'error' && (
        <p className="text-red-600 text-sm bg-red-50 px-4 py-3 border border-red-100 rounded-lg">
          Something went wrong. Please try again or email us directly.
        </p>
      )}

      <button type="submit" disabled={status === 'loading'}
        className="w-full py-4 bg-primary text-white font-semibold hover:bg-primary-dark transition-colors disabled:opacity-60 text-sm uppercase tracking-wide rounded-lg shadow-sm">
        {status === 'loading' ? 'Sending...' : 'Send Enquiry'}
      </button>
      <p className="text-xs text-slate-700 text-center">We respond to all enquiries within two working days.</p>
    </form>
  );
}

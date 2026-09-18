import { useEffect } from 'react';

/* --------------------------------------------------------------- buttons -- */

export function Button({ variant = 'primary', className = '', ...props }) {
  const styles = {
    primary: 'bg-primary text-white hover:bg-primary-dark shadow-sm',
    secondary: 'bg-white text-school-black border border-gray-200 hover:bg-school-off-white',
    danger: 'bg-white text-red-600 border border-red-200 hover:bg-red-50',
  };
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${styles[variant]} ${className}`}
      {...props}
    />
  );
}

/* ----------------------------------------------------------------- cards -- */

export function Card({ className = '', ...props }) {
  return (
    <div
      className={`bg-white border border-gray-100 rounded-xl shadow-sm ${className}`}
      {...props}
    />
  );
}

export function StatCard({ label, value, hint, accent = 'border-t-primary' }) {
  return (
    <div className={`bg-white border border-gray-100 border-t-4 ${accent} p-5 rounded-xl shadow-sm`}>
      <p className="text-3xl font-bold text-school-black tabular-nums">{value}</p>
      <p className="text-sm text-slate-600 mt-1 font-medium">{label}</p>
      {hint && <p className="text-xs text-slate-500 mt-1">{hint}</p>}
    </div>
  );
}

/* ----------------------------------------------------------------- state -- */

/**
 * Shown instead of a bare table when there is nothing yet. A new school opening
 * this dashboard should be told what the screen is for and given the action
 * that fills it, rather than an empty box.
 */
export function EmptyState({ title, description, action }) {
  return (
    <div className="bg-white border border-dashed border-gray-200 rounded-xl px-6 py-14 text-center">
      <p className="font-bold text-school-black">{title}</p>
      {description && (
        <p className="text-sm text-slate-500 mt-2 max-w-md mx-auto leading-relaxed">
          {description}
        </p>
      )}
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}

export function Loading({ label = 'Loading…' }) {
  return <div className="py-16 text-center text-sm text-slate-500">{label}</div>;
}

export function ErrorNote({ children }) {
  if (!children) return null;
  return (
    <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">
      {children}
    </div>
  );
}

/* ---------------------------------------------------------------- badges -- */

const BADGE_STYLES = {
  pending: 'bg-amber-50 text-amber-700 border-amber-200',
  replied: 'bg-green-50 text-green-700 border-green-200',
  published: 'bg-green-50 text-green-700 border-green-200',
  draft: 'bg-slate-100 text-slate-600 border-slate-200',
  enrolled: 'bg-green-50 text-green-700 border-green-200',
  applicant: 'bg-amber-50 text-amber-700 border-amber-200',
  alumni: 'bg-slate-100 text-slate-600 border-slate-200',
  admin: 'bg-primary-50 text-primary border-primary/20',
  teacher: 'bg-slate-100 text-slate-600 border-slate-200',
  headteacher: 'bg-primary-50 text-primary border-primary/20',
};

export function Badge({ value, children }) {
  const key = String(value || '').toLowerCase();
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide rounded-full border ${
        BADGE_STYLES[key] || 'bg-slate-100 text-slate-600 border-slate-200'
      }`}
    >
      {children || value}
    </span>
  );
}

/* ----------------------------------------------------------------- forms -- */

const fieldCls =
  'w-full border border-gray-200 px-3.5 py-2.5 text-sm text-school-black rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/15 transition bg-white';

// A caller's className must extend the field styling, not replace it — spreading
// props over a hard-coded className silently strips every base style.
const field = (extra = '') => `${fieldCls} ${extra}`.trim();

export function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-bold uppercase tracking-wide text-slate-600 mb-1.5">
        {label}
      </span>
      {children}
      {hint && <span className="block text-xs text-slate-500 mt-1">{hint}</span>}
    </label>
  );
}

export function Input({ className = '', ...props }) {
  return <input className={field(className)} {...props} />;
}

export function Select({ className = '', children, ...props }) {
  return (
    <select className={field(className)} {...props}>
      {children}
    </select>
  );
}

export function Textarea({ className = '', ...props }) {
  return <textarea className={field(`resize-y ${className}`)} {...props} />;
}

/* ----------------------------------------------------------------- modal -- */

export function Modal({ open, title, onClose, children, footer }) {
  // Escape closes the dialog, and the page behind it must not scroll while it
  // is open.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 overflow-y-auto">
      <button
        aria-label="Close dialog"
        onClick={onClose}
        className="fixed inset-0 bg-school-black/60"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative bg-white rounded-xl shadow-xl w-full max-w-lg my-8"
      >
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between gap-4">
          <h2 className="font-bold text-school-black">{title}</h2>
          <button
            onClick={onClose}
            aria-label="Close"
            className="text-slate-400 hover:text-school-black transition-colors text-xl leading-none"
          >
            ×
          </button>
        </div>
        <div className="px-6 py-5">{children}</div>
        {footer && (
          <div className="px-6 py-4 border-t border-gray-100 flex justify-end gap-2">{footer}</div>
        )}
      </div>
    </div>
  );
}

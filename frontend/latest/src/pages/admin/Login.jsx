import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { loginAdmin } from '../../services/enquiryAPI';
import { LOGO_ALT, LOGO_SRC } from '../../assets';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const { token } = await loginAdmin(email, password);
      login(token);
      navigate('/admin/dashboard');
    } catch {
      setError('Invalid email or password.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-school-off-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <img src={LOGO_SRC} alt={LOGO_ALT} width="256" height="256" className="h-20 w-auto mx-auto mb-6 object-contain" />
          <h1 className="text-2xl font-bold text-school-black">Admin Login</h1>
          <p className="mt-1 text-sm text-slate-500">Mandela Bilingual Nursery and Primary</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-sm space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1.5">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
              className="w-full border border-gray-200 px-4 py-3 text-sm text-school-black focus:outline-none focus:border-primary transition-colors rounded-lg"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs font-bold uppercase tracking-wide text-slate-500 mb-1.5">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full border border-gray-200 px-4 py-3 text-sm text-school-black focus:outline-none focus:border-primary transition-colors rounded-lg"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-white py-3 text-sm font-bold uppercase tracking-wide hover:bg-primary-dark transition-colors disabled:opacity-60 rounded-lg shadow-sm"
          >
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  );
}

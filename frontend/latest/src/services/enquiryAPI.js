const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function authHeaders(token) {
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` };
}

export async function loginAdmin(email, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error('Invalid credentials');
  return res.json();
}

export async function fetchEnquiries(token, params = {}) {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${BASE_URL}/enquiries?${query}`, {
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error('Failed to fetch enquiries');
  return res.json();
}

export async function fetchStats(token) {
  const res = await fetch(`${BASE_URL}/enquiries/stats`, {
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error('Failed to fetch stats');
  return res.json();
}

export async function fetchEnquiry(token, id) {
  const res = await fetch(`${BASE_URL}/enquiries/${id}`, {
    headers: authHeaders(token),
  });
  if (!res.ok) throw new Error('Failed to fetch enquiry');
  return res.json();
}

export async function updateEnquiry(token, id, data) {
  const res = await fetch(`${BASE_URL}/enquiries/${id}`, {
    method: 'PATCH',
    headers: authHeaders(token),
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update enquiry');
  return res.json();
}

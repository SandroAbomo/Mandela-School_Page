const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Thin wrapper over fetch for the staff dashboard.
 *
 * Every non-2xx response is turned into an Error carrying the server's own
 * message, so a 403 from the role middleware surfaces in the UI as the reason
 * it was refused rather than a generic failure.
 */
async function request(path, { token, method = 'GET', body } = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || `Request failed (${res.status})`);
  return data;
}

const qs = (params) => {
  const clean = Object.fromEntries(
    Object.entries(params).filter(([, v]) => v !== '' && v != null)
  );
  const s = new URLSearchParams(clean).toString();
  return s ? `?${s}` : '';
};

/* ------------------------------------------------------------- overview -- */
export const fetchOverview = (token) => request('/dashboard/overview', { token });

/* ------------------------------------------------------------- students -- */
export const fetchStudents = (token, params = {}) =>
  request(`/students${qs(params)}`, { token });
export const createStudent = (token, body) =>
  request('/students', { token, method: 'POST', body });
export const updateStudent = (token, id, body) =>
  request(`/students/${id}`, { token, method: 'PATCH', body });
export const deleteStudent = (token, id) =>
  request(`/students/${id}`, { token, method: 'DELETE' });

/* ----------------------------------------------------------------- news -- */
export const fetchArticles = (token, params = {}) =>
  request(`/articles${qs(params)}`, { token });
export const createArticle = (token, body) =>
  request('/articles', { token, method: 'POST', body });
export const updateArticle = (token, id, body) =>
  request(`/articles/${id}`, { token, method: 'PATCH', body });
export const deleteArticle = (token, id) =>
  request(`/articles/${id}`, { token, method: 'DELETE' });

/* --------------------------------------------------------------- events -- */
export const fetchEvents = (token) => request('/events', { token });
export const createEvent = (token, body) =>
  request('/events', { token, method: 'POST', body });
export const updateEvent = (token, id, body) =>
  request(`/events/${id}`, { token, method: 'PATCH', body });
export const deleteEvent = (token, id) =>
  request(`/events/${id}`, { token, method: 'DELETE' });

/* ---------------------------------------------------------------- staff -- */
export const fetchUsers = (token) => request('/users', { token });
export const createUser = (token, body) =>
  request('/users', { token, method: 'POST', body });
export const updateUser = (token, id, body) =>
  request(`/users/${id}`, { token, method: 'PATCH', body });
export const deleteUser = (token, id) =>
  request(`/users/${id}`, { token, method: 'DELETE' });

/* --------------------------------------------------- public site content -- */
export const fetchPublicArticles = (limit) => request(`/content/articles${qs({ limit })}`);
export const fetchPublicEvents = (limit) => request(`/content/events${qs({ limit })}`);

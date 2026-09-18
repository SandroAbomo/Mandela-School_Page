import jwt from 'jsonwebtoken';

export function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorised' });
  }
  try {
    req.user = jwt.verify(header.slice(7), process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}

/**
 * Restricts a route to the given roles.
 *
 * The school's policy, enforced here rather than in the browser:
 *   headteacher — everything, including staff accounts
 *   admin       — the office: enquiries, students, news and events
 *   teacher     — read-only; never sees enquiries or staff accounts
 *
 * Always used after requireAuth, which is what populates req.user.
 */
export function requireRole(...roles) {
  return (req, res, next) => {
    if (!req.user) return res.status(401).json({ error: 'Unauthorised' });
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Your role does not allow this action' });
    }
    next();
  };
}

/** Roles permitted to change school records. */
export const canWrite = ['admin', 'headteacher'];

/** Roles permitted to see admissions enquiries. */
export const canSeeEnquiries = ['admin', 'headteacher'];

/** Roles permitted to manage staff accounts. */
export const canManageStaff = ['headteacher'];

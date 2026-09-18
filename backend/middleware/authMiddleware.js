import jwt from 'jsonwebtoken';
import User from '../models/User.js';

/**
 * Verifies the token, then confirms the account behind it is still allowed in.
 *
 * The signature alone is not enough: a token is valid for eight hours, so a
 * member of staff who is demoted or deactivated would otherwise keep the access
 * they had when they signed in. Role and active status are therefore read from
 * the record on every request, and the token is treated as nothing more than a
 * claim about which record to read.
 */
export async function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  if (!header?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorised' });
  }

  let payload;
  try {
    payload = jwt.verify(header.slice(7), process.env.JWT_SECRET);
  } catch {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }

  try {
    const user = await User.findById(payload.id).select('name email role active');

    // Deleted or deactivated reads the same as never signed in.
    if (!user || !user.active) {
      return res.status(401).json({ error: 'Unauthorised' });
    }

    req.user = {
      id: String(user._id),
      name: user.name || user.email,
      email: user.email,
      role: user.role,
    };
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
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

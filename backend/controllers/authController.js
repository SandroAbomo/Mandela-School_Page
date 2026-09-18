import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email: email?.toLowerCase() });

    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Checked after the password so a wrong password and a deactivated account
    // are indistinguishable to someone guessing.
    if (!user.active) {
      return res.status(403).json({ error: 'This account has been deactivated.' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role, name: user.name || user.email },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    user.lastLogin = new Date();
    await user.save();

    // The user is returned so the dashboard can render the right navigation for
    // the role. It is a convenience only — every route re-checks the token.
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/** Lets a returning session confirm who it is without a second sign-in. */
export async function me(req, res) {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.active) return res.status(401).json({ error: 'Unauthorised' });
    res.json({ id: user._id, name: user.name, email: user.email, role: user.role });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

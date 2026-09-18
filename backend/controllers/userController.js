import User from '../models/User.js';

// Password hashes are stripped by the User model's toJSON transform, so no
// handler here has to remember to exclude them.

export async function listUsers(req, res) {
  try {
    const users = await User.find().sort({ createdAt: 1 });
    res.json({ users });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

export async function createUser(req, res) {
  try {
    const { name, email, password, role } = req.body;
    if (!password || password.length < 12) {
      return res.status(400).json({ error: 'Password must be at least 12 characters.' });
    }
    if (await User.findOne({ email: email?.toLowerCase() })) {
      return res.status(409).json({ error: 'An account with that email already exists.' });
    }
    const user = await User.create({ name, email, password, role });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function updateUser(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Not found' });

    const { name, role, active, password } = req.body;

    // A headteacher must not be able to lock themselves out of the only account
    // that can manage staff.
    const removingOwnAccess =
      String(user._id) === req.user.id && (active === false || (role && role !== 'headteacher'));
    if (removingOwnAccess) {
      return res
        .status(400)
        .json({ error: 'You cannot deactivate or demote your own account.' });
    }

    if (name !== undefined) user.name = name;
    if (role !== undefined) user.role = role;
    if (active !== undefined) user.active = active;
    if (password) {
      if (password.length < 12) {
        return res.status(400).json({ error: 'Password must be at least 12 characters.' });
      }
      user.password = password; // hashed by the model's save hook
    }

    await user.save();
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

export async function deleteUser(req, res) {
  try {
    if (String(req.params.id) === req.user.id) {
      return res.status(400).json({ error: 'You cannot delete your own account.' });
    }
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'Not found' });
    res.json({ ok: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

/**
 * Creates the first admin account so the dashboard can be signed into.
 *
 *   npm run seed:admin --prefix backend
 *
 * Credentials come from ADMIN_SEED_EMAIL / ADMIN_SEED_PASSWORD in backend/.env —
 * never from arguments, which would leave the password in shell history. The
 * password is hashed by the User model's save hook, not here.
 *
 * Running it again updates the existing account's password and role instead of
 * failing on the unique email index, so it doubles as a password reset.
 */
import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';

const email = process.env.ADMIN_SEED_EMAIL;
const password = process.env.ADMIN_SEED_PASSWORD;
const role = process.env.ADMIN_SEED_ROLE || 'admin';

function fail(message) {
  console.error(`\n  ${message}\n`);
  process.exit(1);
}

if (!email || !password) {
  fail(
    'Set ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD in backend/.env before running this.\n' +
      '  See backend/.env.example for the full list of variables.'
  );
}

if (password.length < 12) {
  fail('ADMIN_SEED_PASSWORD must be at least 12 characters.');
}

try {
  await connectDB();

  const existing = await User.findOne({ email: email.toLowerCase() });

  if (existing) {
    existing.password = password;
    existing.role = role;
    await existing.save();
    console.log(`Updated existing ${role} account: ${existing.email}`);
  } else {
    const user = await User.create({ email, password, role });
    console.log(`Created ${role} account: ${user.email}`);
  }

  console.log('Sign in at /admin/login.');
} catch (err) {
  console.error(`Could not seed the admin account: ${err.message}`);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}

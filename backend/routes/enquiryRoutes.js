import { Router } from 'express';
import { requireAuth, requireRole, canSeeEnquiries } from '../middleware/authMiddleware.js';
import { enquiryLimiter } from '../middleware/rateLimit.js';
import {
  createEnquiry,
  getEnquiries,
  getStats,
  getEnquiry,
  updateEnquiry,
} from '../controllers/enquiryController.js';

const router = Router();

// Public, and therefore rate limited: this route sends email.
router.post('/', enquiryLimiter, createEnquiry);

// Admissions data is office business: teachers are signed in but must not see
// parents' enquiries, so every route below is role-checked as well as authed.
const officeOnly = [requireAuth, requireRole(...canSeeEnquiries)];

// /stats must come before /:id so "stats" is not parsed as a Mongo ID
router.get('/stats', officeOnly, getStats);
router.get('/',      officeOnly, getEnquiries);
router.get('/:id',   officeOnly, getEnquiry);
router.patch('/:id', officeOnly, updateEnquiry);

export default router;

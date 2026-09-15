import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware.js';
import {
  createEnquiry,
  getEnquiries,
  getStats,
  getEnquiry,
  updateEnquiry,
} from '../controllers/enquiryController.js';

const router = Router();

// Public
router.post('/', createEnquiry);

// Admin — /stats must come before /:id so "stats" is not parsed as a Mongo ID
router.get('/stats', requireAuth, getStats);
router.get('/',      requireAuth, getEnquiries);
router.get('/:id',   requireAuth, getEnquiry);
router.patch('/:id', requireAuth, updateEnquiry);

export default router;

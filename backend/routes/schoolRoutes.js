import { Router } from 'express';
import {
  requireAuth,
  requireRole,
  canWrite,
  canManageStaff,
} from '../middleware/authMiddleware.js';
import { getOverview } from '../controllers/dashboardController.js';
import {
  listStudents, getStudent, createStudent, updateStudent, deleteStudent,
} from '../controllers/studentController.js';
import {
  listArticles, listPublishedArticles, getArticle, createArticle, updateArticle, deleteArticle,
} from '../controllers/articleController.js';
import {
  listEvents, listUpcomingEvents, getEvent, createEvent, updateEvent, deleteEvent,
} from '../controllers/eventController.js';
import { listUsers, createUser, updateUser, deleteUser } from '../controllers/userController.js';

const router = Router();

/* ---------------------------------------------------------------- public --
 * Feeds the website. No token, and only published records are returned.
 */
router.get('/content/articles', listPublishedArticles);
router.get('/content/events', listUpcomingEvents);

/* ----------------------------------------------------------------- staff --
 * Everything below requires a valid token. Reads are open to any signed-in
 * member of staff; writes are restricted by role in the middleware.
 */
router.use(requireAuth);

router.get('/dashboard/overview', getOverview);

// Students — teachers may read the roster, only the office may change it.
router.get('/students', listStudents);
router.get('/students/:id', getStudent);
router.post('/students', requireRole(...canWrite), createStudent);
router.patch('/students/:id', requireRole(...canWrite), updateStudent);
router.delete('/students/:id', requireRole(...canWrite), deleteStudent);

// News — drafts are only ever visible through these authenticated routes.
router.get('/articles', listArticles);
router.get('/articles/:id', getArticle);
router.post('/articles', requireRole(...canWrite), createArticle);
router.patch('/articles/:id', requireRole(...canWrite), updateArticle);
router.delete('/articles/:id', requireRole(...canWrite), deleteArticle);

// Events
router.get('/events', listEvents);
router.get('/events/:id', getEvent);
router.post('/events', requireRole(...canWrite), createEvent);
router.patch('/events/:id', requireRole(...canWrite), updateEvent);
router.delete('/events/:id', requireRole(...canWrite), deleteEvent);

// Staff accounts — headteacher only, top to bottom.
router.get('/users', requireRole(...canManageStaff), listUsers);
router.post('/users', requireRole(...canManageStaff), createUser);
router.patch('/users/:id', requireRole(...canManageStaff), updateUser);
router.delete('/users/:id', requireRole(...canManageStaff), deleteUser);

export default router;

import express from 'express';
import {
  createSweet,
  getSweets,
  searchSweets,
  updateSweet,
  deleteSweet,
  purchaseSweet,
  restockSweet
} from '../controllers/sweetsController.js';

import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Admin-only routes
router.post('/', protect, authorize('admin'), createSweet);
router.put('/:id', protect, authorize('admin'), updateSweet);
router.delete('/:id', protect, authorize('admin'), deleteSweet);
router.post('/:id/restock', protect, authorize('admin'), restockSweet);

// User routes
router.get('/', protect, getSweets);
router.get('/search', protect, searchSweets);
router.post('/:id/purchase', protect, purchaseSweet);

export default router;

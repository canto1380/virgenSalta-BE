import { Router } from 'express'

import {
  createBackdrops,
  allBackdrops,
  backdropById,
  updateBackdrops,
  restoreBackdrops,
  deleteBackdrops
} from '../controllers/backdrops.controller.js'

import {
  getByIdRequestValidations,
  postRequestValidations,
  patchRequestValidations,
  deleteRequestValidations,
  restoreRequestValidations
} from '../middlewares/backdrop.js'

const router = Router()

router.post("/", postRequestValidations, createBackdrops);
router.get("/", allBackdrops);
router.get("/:id", getByIdRequestValidations, backdropById);
router.patch("/:id", patchRequestValidations, updateBackdrops);
router.patch(
  "/deleteBackdrop/:id",
  deleteRequestValidations,
  deleteBackdrops
);
router.patch(
  "/restoreBackdrop/:id",
  restoreRequestValidations,
  restoreBackdrops
);

export default router;

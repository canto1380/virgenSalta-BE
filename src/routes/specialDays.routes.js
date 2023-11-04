import { Router } from 'express'

import {
  createSpecialDays,
  allSpecialDays,
  specialDaysById,
  updateSpecialDays,
  restoreNSpecialDays,
  deleteSpecialDays
} from '../controllers/specialDays.controller.js'

import {
  getByIdRequestValidations,
  postRequestValidations,
  patchRequestValidations,
  deleteRequestValidations,
  restoreRequestValidations
} from '../middlewares/specialDays.js'

const router = Router()

router.post("/", postRequestValidations, createSpecialDays);
router.get("/", allSpecialDays);
router.get("/:id", getByIdRequestValidations, specialDaysById);
router.patch("/:id", patchRequestValidations, updateSpecialDays);
router.patch(
  "/deleteSpecialDays/:id",
  deleteRequestValidations,
  deleteSpecialDays
);
router.patch(
  "/restoreSpecialDays/:id",
  restoreRequestValidations,
  restoreNSpecialDays
);

export default router;

import { Router } from 'express'

import {
  createDailyEvent,
  allDailyEvent,
  dailyEventById,
  updateDailyEvent,
  restoreDailyEvent,
  deleteDailyEvent
} from '../controllers/dailyEvent.controller.js'

import {
  postRequestValidations,
  getByIdRequestValidations,
  patchRequestValidations,
  deleteRequestValidations,
  restoreRequestValidations
} from '../middlewares/dailyEvent.js'

const router = Router()

router.post("/", postRequestValidations, createDailyEvent);
router.get("/", allDailyEvent);
router.get("/:id", getByIdRequestValidations, dailyEventById);
router.patch("/:id", patchRequestValidations, updateDailyEvent);
router.patch(
  "/deleteDailyEvent/:id",
  deleteRequestValidations,
  deleteDailyEvent
);
router.patch(
  "/restoreDailyEvent/:id",
  restoreRequestValidations,
  restoreDailyEvent
);

export default router;

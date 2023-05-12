import { Router } from 'express'

import {
  createEventType,
  allEventType,
  eventTypeById,
  updateEventType,
  restoreEventType,
  deleteEventType
} from '../controllers/eventType.controller.js'

import {
  postRequestValidations,
  getByIdRequestValidations,
  patchRequestValidations,
  deleteRequestValidations,
  restoreRequestValidations
} from '../middlewares/eventType.js'

const router = Router()

router.post("/", postRequestValidations, createEventType);
router.get("/", allEventType);
router.get("/:id", getByIdRequestValidations, eventTypeById);
router.patch("/:id", patchRequestValidations, updateEventType);
router.patch(
  "/deleteEventType/:id",
  deleteRequestValidations,
  deleteEventType
);
router.patch(
  "/restoreEventType/:id",
  restoreRequestValidations,
  restoreEventType
);

export default router;

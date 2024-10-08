import { Router } from 'express'

import {
  createMessageVirgen,
  allMessageVirgen,
  messageVirgenById,
  updateMessageVirgen,
  restoreMessageVirgen,
  deleteMessageVirgen,
} from '../controllers/messageVirgen.controller.js'

import {
  getByIdRequestValidations,
  postRequestValidations,
  patchRequestValidations,
  deleteRequestValidations,
  restoreRequestValidations
} from '../middlewares/messageVirgen.js'

const router = Router()

router.post("/", postRequestValidations, createMessageVirgen);
router.get("/", allMessageVirgen);
router.get("/:id", getByIdRequestValidations, messageVirgenById);
router.patch("/:id", patchRequestValidations, updateMessageVirgen);

router.patch(
  "/deleteMessageVirgen/:id",
  deleteRequestValidations,
  deleteMessageVirgen
);
router.patch(
  "/restoreMessageVirgen/:id",
  restoreRequestValidations,
  restoreMessageVirgen
);

export default router;

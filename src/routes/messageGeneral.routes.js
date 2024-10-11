import { Router } from 'express'

import {
  createMessageGeneral,
  allMessageGeneral,
  messageGeneralById,
  updateMessageGeneral,
  restoreMessageGeneral,
  deleteMessageGeneral,
} from '../controllers/messageGeneral.controller.js'

import {
  getByIdRequestValidations,
  postRequestValidations,
  patchRequestValidations,
  deleteRequestValidations,
  restoreRequestValidations
} from '../middlewares/messageGeneral.js'

const router = Router()

router.post("/", postRequestValidations, createMessageGeneral);
router.get("/", allMessageGeneral);
router.get("/:id", getByIdRequestValidations, messageGeneralById);
router.patch("/:id", patchRequestValidations, updateMessageGeneral);

router.patch(
  "/deleteMessageGeneral/:id",
  deleteRequestValidations,
  deleteMessageGeneral
);
router.patch(
  "/restoreMessageGeneral/:id",
  restoreRequestValidations,
  restoreMessageGeneral
);

export default router;

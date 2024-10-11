import { Router } from 'express'

import {
  createMessageJesus,
  allMessageJesus,
  messageJesusById,
  updateMessageJesus,
  restoreMessageJesus,
  deleteMessageJesus,
} from '../controllers/messageJesus.controller.js'

import {
  getByIdRequestValidations,
  postRequestValidations,
  patchRequestValidations,
  deleteRequestValidations,
  restoreRequestValidations
} from '../middlewares/messageJesus.js'

const router = Router()

router.post("/", postRequestValidations, createMessageJesus);
router.get("/", allMessageJesus);
router.get("/:id", getByIdRequestValidations, messageJesusById);
router.patch("/:id", patchRequestValidations, updateMessageJesus);

router.patch(
  "/deleteMessageJesus/:id",
  deleteRequestValidations,
  deleteMessageJesus
);
router.patch(
  "/restoreMessageJesus/:id",
  restoreRequestValidations,
  restoreMessageJesus
);

export default router;

import { Router } from 'express'

import {
  createHistory,
  allHistory,
  historyById,
  updateHistory,
  restoreHistory,
  deleteHistory
} from '../controllers/history.controller.js'

import {
  getByIdRequestValidations,
  postRequestValidations,
  patchRequestValidations,
  deleteRequestValidations,
  restoreRequestValidations
} from '../middlewares/history.js'

const router = Router()

router.post("/", postRequestValidations, createHistory);
router.get("/", allHistory);
router.get("/:id", getByIdRequestValidations, historyById);
router.patch("/:id", patchRequestValidations, updateHistory);
router.patch(
  "/deleteHistory/:id",
  deleteRequestValidations,
  deleteHistory
);
router.patch(
  "/restoreHistory/:id",
  restoreRequestValidations,
  restoreHistory
);

export default router;

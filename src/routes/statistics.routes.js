import { Router } from "express";
import {
  createStatistics,
  allStatistics,
  statisticsById,
  updateStatistics,
  deleteStatistics,
  updateOrderNumber,
  restoreStatistics
} from '../controllers/statistics.controller.js'

import {
  postRequestValidations,
  getByIdRequestValidations,
  patchRequestValidations,
  deleteRequestValidations,
  restoreRequestValidations
} from '../middlewares/statistics.js'

const router = Router()

router.post("/", postRequestValidations, createStatistics);
router.get("/", allStatistics);
router.patch("/updateOrderNumber", updateOrderNumber)
router.get("/:id", getByIdRequestValidations, statisticsById);
router.patch("/:id", patchRequestValidations, updateStatistics);
router.patch(
  "/deleteStatistics/:id",
  deleteRequestValidations,
  deleteStatistics
);
router.patch(
  "/restoreStatistics/:id",
  restoreRequestValidations,
  restoreStatistics
);

export default router;
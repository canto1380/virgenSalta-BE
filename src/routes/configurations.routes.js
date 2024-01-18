import { Router } from "express";
import {
  createConfigurations,
  allConfigurations,
  configurationsById,
  updateConfigurations,
  deleteConfigurations,
  restoreConfigurations
} from '../controllers/configurations.controller.js'

import {
  postRequestValidations,
  getByIdRequestValidations,
  patchRequestValidations,
  deleteRequestValidations,
  restoreRequestValidations
} from '../middlewares/configurations.js'

const router = Router()

router.post("/", postRequestValidations, createConfigurations);
router.get("/", allConfigurations);
router.get("/:id", getByIdRequestValidations, configurationsById);
router.patch("/:id", patchRequestValidations, updateConfigurations);
router.patch(
  "/deleteConfiguration/:id",
  deleteRequestValidations,
  deleteConfigurations
);
router.patch(
  "/restoreConfiguration/:id",
  restoreRequestValidations,
  restoreConfigurations
);

export default router;
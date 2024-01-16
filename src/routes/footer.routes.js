import { Router } from "express";
import {
  createDirectAccessFooter,
  allDirectAccessFooter,
  directAccessFooterById,
  updateDirectAccessFooter,
  deleteDirectAccessFooter,
  updateOrderNumber,
  restoreDirectFooterAccess
} from '../controllers/footer.controller.js'

import {
  postRequestValidations,
  getByIdRequestValidations,
  patchRequestValidations,
  deleteRequestValidations,
  restoreRequestValidations
} from '../middlewares/footer.js'

const router = Router()

router.post("/", postRequestValidations, createDirectAccessFooter);
router.get("/", allDirectAccessFooter);
router.patch("/updateOrderNumber", updateOrderNumber)
router.get("/:id", getByIdRequestValidations, directAccessFooterById);
router.patch("/:id", patchRequestValidations, updateDirectAccessFooter);
router.patch(
  "/deleteFooter/:id",
  deleteRequestValidations,
  deleteDirectAccessFooter
);
router.patch(
  "/restoreFooter/:id",
  restoreRequestValidations,
  restoreDirectFooterAccess
);

export default router;
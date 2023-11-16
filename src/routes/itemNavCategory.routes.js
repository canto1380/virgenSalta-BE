import { Router } from 'express'

import {
  createItemNavCategory,
  allItemNavCategory,
  itemNavCategoryById,
  updateItemNavCategory,
  restoreItemNavCategory,
  deleteItemNavCategory,
  updateOrderNumber
} from '../controllers/itemNavCategory.controller.js'

import {
  getByIdRequestValidations,
  postRequestValidations,
  patchRequestValidations,
  deleteRequestValidations,
  restoreRequestValidations
} from '../middlewares/itemNavCategory.js'

const router = Router()

router.post("/", postRequestValidations, createItemNavCategory);
router.get("/", allItemNavCategory);
router.patch("/updateOrderNumber", updateOrderNumber)
router.get("/:id", getByIdRequestValidations, itemNavCategoryById);
router.patch("/:id", patchRequestValidations, updateItemNavCategory);
router.patch(
  "/deleteItemNavCategory/:id",
  deleteRequestValidations,
  deleteItemNavCategory
);
router.patch(
  "/restoreItemNavCategory/:id",
  restoreRequestValidations,
  restoreItemNavCategory
);

export default router;

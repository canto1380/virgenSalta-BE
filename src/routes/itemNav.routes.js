import { Router } from 'express'

import {
  createItemNav,
  allItemNav,
  itemNavById,
  updateItemNav,
  restoreItemNav,
  deleteItemNav
} from '../controllers/itemNav.controller.js'

import {
  getByIdRequestValidations,
  postRequestValidations,
  patchRequestValidations,
  deleteRequestValidations,
  restoreRequestValidations
} from '../middlewares/itemNav.js'

const router = Router()

router.post("/", postRequestValidations, createItemNav);
router.get("/", allItemNav);
router.get("/:id", getByIdRequestValidations, itemNavById);
router.patch("/:id", patchRequestValidations, updateItemNav);
router.patch(
  "/deleteItemNav/:id",
  deleteRequestValidations,
  deleteItemNav
);
router.patch(
  "/restoreItemNav/:id",
  restoreRequestValidations,
  restoreItemNav
);

export default router;

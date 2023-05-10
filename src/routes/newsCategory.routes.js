import { Router } from 'express'

import {
  createNewsCategory,
  allNewsCategory,
  newsCategoryById,
  updateNewsCategory,
  restoreNewsCategory,
  deleteNewsCategory
} from '../controllers/newsCategory.controller.js'

import {
  getByIdRequestValidations,
  postRequestValidations,
  patchRequestValidations,
  deleteRequestValidations,
  restoreRequestValidations
} from '../middlewares/newsCategory.js'

const router = Router()

router.post("/", postRequestValidations, createNewsCategory);
router.get("/", allNewsCategory);
router.get("/:id", getByIdRequestValidations, newsCategoryById);
router.patch("/:id", patchRequestValidations, updateNewsCategory);
router.patch(
  "/deleteNewsCategory/:id",
  deleteRequestValidations,
  deleteNewsCategory
);
router.patch(
  "/restoreNewsCategory/:id",
  restoreRequestValidations,
  restoreNewsCategory
);

export default router;

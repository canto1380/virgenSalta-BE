import { Router } from 'express'

import {
  createNews,
  allNews,
  newsById,
  updateNews,
  restoreNews,
  deleteNews,
  updateVisibilityNews
} from '../controllers/news.controller.js'

import {
  getByIdRequestValidations,
  postRequestValidations,
  patchRequestValidations,
  deleteRequestValidations,
  restoreRequestValidations
} from '../middlewares/news.js'

const router = Router()

router.post("/", postRequestValidations, createNews);
router.get("/", allNews);
router.get("/:id", getByIdRequestValidations, newsById);
router.patch("/:id", patchRequestValidations, updateNews);
router.patch("/updateVisibility/:id", updateVisibilityNews)
router.patch(
  "/deleteNews/:id",
  deleteRequestValidations,
  deleteNews
);
router.patch(
  "/restoreNews/:id",
  restoreRequestValidations,
  restoreNews
);

export default router;

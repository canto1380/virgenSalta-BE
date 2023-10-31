import { Router } from 'express'

import {
  createCarousel,
  allCarousel,
  carouselById,
  updateCarousel,
  restoreCarousel,
  deleteCarousel
} from '../controllers/Carousel.controller.js'

import {
  getByIdRequestValidations,
  postRequestValidations,
  patchRequestValidations,
  deleteRequestValidations,
  restoreRequestValidations
} from '../middlewares/carousel.js'

const router = Router()

router.post("/", postRequestValidations, createCarousel);
router.get("/", allCarousel);
router.get("/:id", getByIdRequestValidations, carouselById);
router.patch("/:id", patchRequestValidations, updateCarousel);
router.patch(
  "/deleteCarousel/:id",
  deleteRequestValidations,
  deleteCarousel
);
router.patch(
  "/restoreCarousel/:id",
  restoreRequestValidations,
  restoreCarousel
);

export default router;

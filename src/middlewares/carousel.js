import { check } from "express-validator";
import validResult from './commons.js'

import {validJWT} from './authToken.js'
import AppError from '../errors/appError.js'

import {
  verifyIdExistsCarousel,
  verifyNameExistsCarousel
} from '../controllers/Carousel.controller.js'

const nameRequired = check('nameItem', 'Nombre requerido').not().isEmpty()

const nameCarouselNotRepeat = check('nameItem').custom(async(nameItem) => {
  if(!nameItem) {
    return
  }
  const CarouselFound = await verifyNameExistsCarousel(nameItem)
  if(CarouselFound !== null) {
    throw new AppError('El nombre de la categoria ingresada ya existe', 400)
  }
})

const idCarouselExists = check('id').custom(async(id) => {
  const carouselFound = await verifyIdExistsCarousel(id)
  if(!carouselFound) {
    throw new AppError('No existe el item buscado', 400)
  }
})

export const postRequestValidations = [
  validJWT,
  nameRequired,
  nameCarouselNotRepeat,
  validResult
]

export const getByIdRequestValidations = [
  idCarouselExists,
  validResult
]
export const patchRequestValidations = [
  validJWT,
  idCarouselExists,
  // nameCarouselNotRepeat,
  validResult
]
export const deleteRequestValidations = [
  validJWT,
  idCarouselExists,
  validResult
]
export const restoreRequestValidations = [
  validJWT,
  idCarouselExists,
  validResult
]

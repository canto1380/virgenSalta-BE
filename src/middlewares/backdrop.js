import { check } from "express-validator";
import validResult from './commons.js'

import {validJWT} from './authToken.js'
import AppError from '../errors/appError.js'

import {
  verifyIdExistsBackdrops,
  verifyNameExistsBackdrops
} from '../controllers/backdrops.controller.js'

const fieldRequired = check(['nameBackdrop', 'backdrop'], 'Campos requeridos').not().isEmpty()

const nameBackdropNotRepeat = check('nameBackdrop').custom(async(nameBackdrop) => {
  if(!nameBackdrop) {
    return
  }
  const backdropFound = await verifyNameExistsBackdrops(nameBackdrop)
  if(backdropFound !== null) {
    throw new AppError('El nombre de la portada ingresada ya existe', 400)
  }
})

const idBackdropExists = check('id').custom(async(id) => {
  const backdropFound = await verifyIdExistsBackdrops(id)
  if(!backdropFound) {
    throw new AppError('No existe la portada buscada', 400)
  }
})

export const postRequestValidations = [
  validJWT,
  fieldRequired,
  nameBackdropNotRepeat,
  validResult
]

export const getByIdRequestValidations = [
  idBackdropExists,
  validResult
]
export const patchRequestValidations = [
  validJWT,
  idBackdropExists,
  // nameBackdropNotRepeat,
  validResult
]
export const deleteRequestValidations = [
  validJWT,
  idBackdropExists,
  validResult
]
export const restoreRequestValidations = [
  validJWT,
  idBackdropExists,
  validResult
]

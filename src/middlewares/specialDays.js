import { check } from "express-validator";
import validResult from './commons.js'

import {validJWT} from './authToken.js'
import AppError from '../errors/appError.js'

import {
  verifyIdExistsSpecialDays,
  verifyNameExistsSpecialDays
} from '../controllers/specialDays.controller.js'

const nameRequired = check(['title','subtitle', 'description'], 'Campo requerido').not().isEmpty()

const titleSpecialDaysNotRepeat = check('title').custom(async(title) => {
  if(!title) {
    return
  }
  const specialDaysFound = await verifyNameExistsSpecialDays(title)
  if(specialDaysFound !== null) {
    throw new AppError('El titulo de la jornada ingresada ya existe', 400)
  }
})

const lengthTitle = check(
  "title",
  "El campo 'Titulo' debe tener entre 5 y 60 caracteres"
).isLength({ min: 5, max: 60 });

const lengthSubtitle = check(
  "title",
  "El campo 'Subtitulo' debe tener entre 5 y 150 caracteres"
).isLength({ min: 5, max: 150 });

const lengthDescription = check(
  "title",
  "El campo 'Descripción' debe tener entre 10 y 6000 caracteres"
).isLength({ min: 10, max: 6000 });

const idSpecialDaysExists = check('id').custom(async(id) => {
  const specialDaysFound = await verifyIdExistsSpecialDays(id)
  if(!specialDaysFound) {
    throw new AppError('No existe la jornada buscada', 400)
  }
})

export const postRequestValidations = [
  validJWT,
  nameRequired,
  titleSpecialDaysNotRepeat,
  lengthTitle,
  lengthSubtitle,
  lengthDescription,
  validResult
]

export const getByIdRequestValidations = [
  idSpecialDaysExists,
  validResult
]
export const patchRequestValidations = [
  validJWT,
  idSpecialDaysExists,
  lengthTitle,
  lengthSubtitle,
  lengthDescription,
  validResult
]
export const deleteRequestValidations = [
  validJWT,
  idSpecialDaysExists,
  validResult
]
export const restoreRequestValidations = [
  validJWT,
  idSpecialDaysExists,
  validResult
]

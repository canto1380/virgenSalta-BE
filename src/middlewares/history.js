import { check } from "express-validator";
import validResult from './commons.js'

import {validJWT} from './authToken.js'
import AppError from '../errors/appError.js'

import {
  verifyIdExistsHistory,
  verifyNameExistsHistory
} from '../controllers/history.controller.js'
const fieldRequired = check(['title', 'description'], 'Campo requerido').not().isEmpty()

const nameHistoryNotRepeat = check('title').custom(async(title) => {
  if(!title) {
    return
  }
  const historyFound = await verifyNameExistsHistory(title)
  if(historyFound !== null) {
    throw new AppError('El nombre de la historia ingresada ya existe', 400)
  }
})
const lengthCaption = check(
  "caption",
  "El campo 'Pie de Foto' debe tener entre 5 y 100 caracteres"
).isLength({ min: 5, max: 100 });

const lengthDescription = check(
  "description",
  "El campo 'Descripción' debe tener al menos 150 caracteres"
).isLength({ min: 150});

const lenghtInput = check(
  "title",
  "Los campos 'Título' deben tener entre 10 y 150 caracteres"
).isLength({ min: 5, max: 150 });

const idHistoryExists = check('id').custom(async(id) => {
  const historyFound = await verifyIdExistsHistory(id)
  if(!historyFound) {
    throw new AppError('No existe la historia buscada', 400)
  }
})

export const postRequestValidations = [
  validJWT,
  fieldRequired,
  nameHistoryNotRepeat,
  // lengthCaption,
  lengthDescription,
  lenghtInput,
  validResult
]

export const getByIdRequestValidations = [
  idHistoryExists,
  validResult
]
export const patchRequestValidations = [
  validJWT,
  idHistoryExists,
  lengthCaption,
  lengthDescription,
  lenghtInput,
  validResult
]
export const deleteRequestValidations = [
  validJWT,
  idHistoryExists,
  validResult
]
export const restoreRequestValidations = [
  validJWT,
  idHistoryExists,
  validResult
]

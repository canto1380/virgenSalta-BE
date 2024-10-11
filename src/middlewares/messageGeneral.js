import {check} from 'express-validator'
import validResult from './commons.js'
import {validJWT} from './authToken.js'
import AppError from '../errors/appError.js'

import { verifyIdExistsMessage } from '../controllers/messageGeneral.controller.js'

const fieldRequired = check(['year', 'message'], 'Campo requerido').not().isEmpty()

const lengthMessage = check(
  "message",
  "El campo 'Mensaje' no puede estar vacio"
).isLength({ min: 1});

const lenghtYear = check(
  "year",
  "El campo 'Anio' no puede estar vacio"
).isLength({ min: 1});


const idMessageExists = check('id').custom(async(id) => {
  const messageFound = await verifyIdExistsMessage(id)
  if(!messageFound) {
    throw new AppError('No existe el mensaje buscado', 400)
  }
})


export const postRequestValidations = [
  validJWT,
  fieldRequired,
  lengthMessage,
  lenghtYear,
  validResult
]

export const getByIdRequestValidations = [
  idMessageExists,
  validResult
]
export const patchRequestValidations = [
  validJWT,
  idMessageExists,
  lengthMessage,
  lenghtYear,
  validResult
]
export const deleteRequestValidations = [
  validJWT,
  idMessageExists,
  validResult
]
export const restoreRequestValidations = [
  validJWT,
  idMessageExists,
  validResult
]

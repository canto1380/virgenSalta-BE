import {check} from 'express-validator'
import validResult from './commons.js'
import { validJWT } from './authToken.js'
import AppError from '../errors/appError.js'

import {
  verifyIdExistsImportantEvent,
  verifyNameExistsImportantEvent
} from '../controllers/importantEvent.controller.js'

const eventNameRequired = check('eventName', 'Campo requerido').not().isEmpty()
const eventNameNotRepeat = check('eventName').custom(async(eventName) => {
  if(!eventName) {
    return
  }
  const eventNameFound = await verifyNameExistsImportantEvent(eventName)
  if(eventNameFound !== null) {
    throw new AppError('El nombre de evento ingresado ya existe', 400)
  }
})

const idImportantEventExist = check('id').custom(async(id) => {
  const eventFound = await verifyIdExistsImportantEvent(id)
  if(!eventFound) {
    throw new AppError('No existe el evento buscado', 400)
  }
})

export const postRequestValidations = [
  validJWT,
  eventNameRequired,
  eventNameNotRepeat,
  validResult
]

export const getByIdRequestValidations = [
  idImportantEventExist,
  validResult
]
export const patchRequestValidations = [
  validJWT,
  eventNameRequired,
  idImportantEventExist,
  validResult
]
export const deleteRequestValidations = [
  validJWT,
  idImportantEventExist,
  validResult
]
export const restoreRequestValidations = [
  validJWT,
  idImportantEventExist,
  validResult
]

import { check } from "express-validator";
import validResult from './commons.js'

import {validJWT} from './authToken.js'
import AppError from '../errors/appError.js'

import {verifyIdExistsEventType, verifyNameExistsEventType} from '../controllers/eventType.controller.js'

const eventNameRequired = check('eventName', 'Campo requerido').not().isEmpty()

const eventNameNoRepeat = check('eventName').custom(async(eventName) => {
  if(!eventName) {
    return
  }
  const eventNameFound = await verifyNameExistsEventType(eventName)
  if(eventNameFound !== null) {
    throw new AppError('El nombre de tipos de eventos ingresado ya existe', 400)
  }
})

const idEventTypeExist = check('id').custom(async(id) => {
  const eventTypeFound = await verifyIdExistsEventType(id)
  if(!eventTypeFound) {
    throw new AppError('No existe el tipo de eventos buscado', 400)
  }
})

export const postRequestValidations = [
  validJWT,
  eventNameRequired,
  eventNameNoRepeat,
  validResult
]

export const getByIdRequestValidations = [
  idEventTypeExist,
  validResult
]
export const patchRequestValidations = [
  validJWT,
  eventNameRequired,
  idEventTypeExist,
  eventNameNoRepeat,
  validResult
]
export const deleteRequestValidations = [
  validJWT,
  idEventTypeExist,
  validResult
]
export const restoreRequestValidations = [
  validJWT,
  idEventTypeExist,
  validResult
]

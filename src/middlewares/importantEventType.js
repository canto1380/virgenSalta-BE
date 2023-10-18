import {check} from 'express-validator'
import validResult from './commons.js'
import { validJWT } from './authToken.js'
import AppError from '../errors/appError.js'

import { verifyIdExistsImportantEventType, verifyNameExistsImportantEventType } from '../controllers/importantEventType.controller.js'

const nameRequired = check('name', 'Campo requerido').not().isEmpty()
const nameNotRepeat = check('name').custom(async(name) => {
  if(!name) {
    return
  }
  const eventNameFound = await verifyNameExistsImportantEventType(name)
  if(eventNameFound !== null) {
    throw new AppError('El nombre de tipos de eventos ingresado ya existe', 400)
  }
})

const idImportantEventTypeExist = check('id').custom(async(id) => {
  const eventTypeFound = await verifyIdExistsImportantEventType(id)
  if(!eventTypeFound) {
    throw new AppError('No existe el tipo de eventos buscado', 400)
  }
})

export const postRequestValidations = [
  validJWT,
  nameRequired,
  nameNotRepeat,
  validResult
]

export const getByIdRequestValidations = [
  idImportantEventTypeExist,
  validResult
]
export const patchRequestValidations = [
  validJWT,
  nameRequired,
  idImportantEventTypeExist,
  nameNotRepeat,
  validResult
]
export const deleteRequestValidations = [
  validJWT,
  idImportantEventTypeExist,
  validResult
]
export const restoreRequestValidations = [
  validJWT,
  idImportantEventTypeExist,
  validResult
]

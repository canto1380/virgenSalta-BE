import { check } from "express-validator";
import validResult from './commons.js'

import {validJWT} from './authToken.js'
import AppError from '../errors/appError.js'

import {verifyIdExistsEventType} from '../controllers/eventType.controller.js'
import {verifyIdDailyEvent} from '../controllers/dailyEvent.controller.js'

const fieldRequired = check(['day', 'idEventType', 'time', 'text'], 'Campo requerido').not().isEmpty()

const idEDailyEventExists = check('id').custom(async(id) => {
  const eventTypeFound = await verifyIdDailyEvent(id)
  if(!eventTypeFound) {
    throw new AppError('No existe el enveto buscado', 400)
  }
})

const verifyIdExistEventType = check('idEventType').custom(
  async (idEventType) => {
    if(!idEventType) {
      return
    } else {
      const idEventTypeFound = await verifyIdExistsEventType(idEventType)
      if(idEventTypeFound === null) {
        throw new AppError('El id del tipo de evento no existe', 400)
      }
    }
  }
)

export const postRequestValidations = [
  validJWT,
  fieldRequired,
  verifyIdExistEventType,
  validResult
]

export const getByIdRequestValidations = [
  idEDailyEventExists,
  validResult
]
export const patchRequestValidations = [
  validJWT,
  fieldRequired,
  idEDailyEventExists,
  verifyIdExistEventType,
  validResult
]
export const deleteRequestValidations = [
  validJWT,
  idEDailyEventExists,
  validResult
]
export const restoreRequestValidations = [
  validJWT,
  idEDailyEventExists,
  validResult
]

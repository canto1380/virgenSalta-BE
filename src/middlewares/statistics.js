import { check } from "express-validator";
import validResult from './commons.js'

import {validJWT} from './authToken.js'
import AppError from '../errors/appError.js'

import {verifyIdExistsStatistics, verifyNameExistsStatistics} from '../controllers/statistics.controller.js'

const fieldRequired = check(['title', 'description'], 'Campo Requerido').not().isEmpty()
const titleNotRepeat = check('title').custom(async(title) => {
  if(!title){
    return
  }
  const titleFound = await verifyNameExistsStatistics(title)
  if(titleFound !== null){
    throw new AppError('El título ya fue usado', 400)
  }
})

const lenghtInput = check(
  "title",
  "El campo'Título' deben tener entre 1 y 20 caracteres"
).isLength({ min: 1, max: 20 });

const lenghtDescription = check(
  "description",
  "El campo 'Descripción' deben tener entre 5 y 50 caracteres"
).isLength({ min: 5, max: 50 });

const idStatisticsExist = check('id').custom(async(id) =>{
  const statisticsFound = await verifyIdExistsStatistics(id)
  if(!statisticsFound) {
    throw new AppError('No existe el item buscado', 400)
  }
})

export const postRequestValidations = [
  validJWT,
  fieldRequired,
  titleNotRepeat,
  lenghtInput,
  lenghtDescription,
  validResult
]

export const getByIdRequestValidations = [
  idStatisticsExist,
  validResult
]
export const patchRequestValidations = [
  validJWT,
  idStatisticsExist,
  lenghtInput,
  lenghtDescription,
  validResult
]
export const deleteRequestValidations = [
  validJWT,
  idStatisticsExist,
  validResult
]
export const restoreRequestValidations = [
  validJWT,
  idStatisticsExist,
  validResult
]
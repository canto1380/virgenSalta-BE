import { check } from "express-validator";
import validResult from './commons.js'

import {validJWT} from './authToken.js'
import AppError from '../errors/appError.js'

import {verifyIdExistsConfigurations, verifyNameExistsConfigurations} from '../controllers/configurations.controller.js'

const fieldRequired = check(['title', 'mixedField', 'typeField'], 'Campo Requerido').not().isEmpty()
const titleNotRepeat = check('title').custom(async(title) => {
  if(!title){
    return
  }
  const titleFound = await verifyNameExistsConfigurations(title)
  if(titleFound !== null){
    throw new AppError('El título ya fue usado', 400)
  }
})

const lenghtInput = check(
  "title",
  "El campo'Título' deben tener entre 3 y 40 caracteres"
).isLength({ min: 3, max: 40 });


const idConfigurationsExists = check('id').custom(async(id) =>{
  const statisticsFound = await verifyIdExistsConfigurations(id)
  if(!statisticsFound) {
    throw new AppError('No existe el item buscado', 400)
  }
})

export const postRequestValidations = [
  validJWT,
  fieldRequired,
  titleNotRepeat,
  lenghtInput,
  validResult
]

export const getByIdRequestValidations = [
  idConfigurationsExists,
  validResult
]
export const patchRequestValidations = [
  validJWT,
  idConfigurationsExists,
  lenghtInput,
  validResult
]
export const deleteRequestValidations = [
  validJWT,
  idConfigurationsExists,
  validResult
]
export const restoreRequestValidations = [
  validJWT,
  idConfigurationsExists,
  validResult
]
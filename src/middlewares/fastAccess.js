import { check } from "express-validator";
import validResult from './commons.js'

import {validJWT} from './authToken.js'
import AppError from '../errors/appError.js'

import {verifyIdExistsFastAccess, verifyNameExistsFastAccess} from '../controllers/fastAccess.controller.js'

const fieldRequired = check(['title', 'pathUrl', 'url'], 'Campo Requerido').not().isEmpty()
const titleNotRepeat = check('title').custom(async(title) => {
  if(!title){
    return
  }
  const titleFound = await verifyNameExistsFastAccess(title)
  if(titleFound !== null){
    throw new AppError('El título ya fue usado', 400)
  }
})

const lenghtInput = check(
  "title",
  "El campo'Título' deben tener entre 5 y 50 caracteres"
).isLength({ min: 5, max: 50 });

const idFastAccessExist = check('title').custom(async(id) =>{
  const fastAccessFound = await verifyIdExistsFastAccess(id)
  if(!fastAccessFound) {
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
  idFastAccessExist,
  validResult
]
export const patchRequestValidations = [
  validJWT,
  idFastAccessExist,
  lenghtInput,
  validResult
]
export const deleteRequestValidations = [
  validJWT,
  idFastAccessExist,
  validResult
]
export const restoreRequestValidations = [
  validJWT,
  idFastAccessExist,
  validResult
]
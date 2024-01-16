import { check } from "express-validator";
import validResult from './commons.js'

import {validJWT} from './authToken.js'
import AppError from '../errors/appError.js'

import {verifyIdExistsDirectAccessFooter, verifyNameExistsDirectAccessFooter} from '../controllers/footer.controller.js'

const fieldRequired = check(['title', 'urlRedirect'], 'Campo Requerido').not().isEmpty()
const titleNotRepeat = check('title').custom(async(title) => {
  if(!title){
    return
  }
  const titleFound = await verifyNameExistsDirectAccessFooter(title)
  if(titleFound !== null){
    throw new AppError('El título ya fue usado', 400)
  }
})

const lenghtInput = check(
  "title",
  "El campo'Título' deben tener entre 3 y 40 caracteres"
).isLength({ min: 3, max: 40 });


const idDirectAccessExist = check('id').custom(async(id) =>{
  const statisticsFound = await verifyIdExistsDirectAccessFooter(id)
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
  idDirectAccessExist,
  validResult
]
export const patchRequestValidations = [
  validJWT,
  idDirectAccessExist,
  lenghtInput,
  validResult
]
export const deleteRequestValidations = [
  validJWT,
  idDirectAccessExist,
  validResult
]
export const restoreRequestValidations = [
  validJWT,
  idDirectAccessExist,
  validResult
]
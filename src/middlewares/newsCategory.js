import { check } from "express-validator";
import validResult from './commons.js'

import {validJWT} from './authToken.js'
import AppError from '../errors/appError.js'

import {
  verifyIdExistsNewsCategory,
  verifyNameExistsNewsCategory
} from '../controllers/newsCategory.controller.js'

const nameRequired = check('nameCategory', 'Nombre requerido').not().isEmpty()

const nameNewsCategoryNotRepeat = check('nameCategory').custom(async(nameCategory) => {
  if(!nameCategory) {
    return
  }
  const newsCategoryFound = await verifyNameExistsNewsCategory(nameCategory)
  if(newsCategoryFound !== null) {
    throw new AppError('El nombre de la categoria ingresada ya existe', 400)
  }
})

const lengthCaption = check(
  "nameCategory",
  "El campo 'Nombre Categoría' debe tener entre 5 y 40 caracteres"
).isLength({ min: 5, max: 40 });

const idNewsCategoryExists = check('id').custom(async(id) => {
  const newsCategoryFound = await verifyIdExistsNewsCategory(id)
  if(!newsCategoryFound) {
    throw new AppError('No existe la categoría buscada', 400)
  }
})

export const postRequestValidations = [
  validJWT,
  nameRequired,
  nameNewsCategoryNotRepeat,
  lengthCaption,
  validResult
]

export const getByIdRequestValidations = [
  idNewsCategoryExists,
  validResult
]
export const patchRequestValidations = [
  validJWT,
  idNewsCategoryExists,
  // nameNewsCategoryNotRepeat,
  lengthCaption,
  validResult
]
export const deleteRequestValidations = [
  validJWT,
  idNewsCategoryExists,
  validResult
]
export const restoreRequestValidations = [
  validJWT,
  idNewsCategoryExists,
  validResult
]

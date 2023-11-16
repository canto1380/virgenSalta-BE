import { check } from "express-validator";
import validResult from './commons.js'

import {validJWT} from './authToken.js'
import AppError from '../errors/appError.js'

import {
  verifyIdExistsItemNavCategory,
  verifyNameExistsItemNavCategory
} from '../controllers/itemNavCategory.controller.js'

const nameRequired = check('itemNavCategory', 'Nombre requerido').not().isEmpty()

const nameNewsCategoryNotRepeat = check('itemNavCategory').custom(async(itemNavCategory) => {
  if(!itemNavCategory) {
    return
  }
  const itemNavCategoryFound = await verifyNameExistsItemNavCategory(itemNavCategory)
  if(itemNavCategoryFound !== null) {
    throw new AppError('El nombre de la sección ingresada ya existe', 400)
  }
})
const lengthTitle = check(
  "itemNavCategory",
  "El campo 'Nombre Categoría' debe tener entre 5 y 40 caracteres"
).isLength({ min: 5, max: 40 });


const idItemNavCategoryExists = check('id').custom(async(id) => {
  const itemNavCategoryFound = await verifyIdExistsItemNavCategory(id)
  if(!itemNavCategoryFound) {
    throw new AppError('No existe la sección buscada', 400)
  }
})

export const postRequestValidations = [
  validJWT,
  nameRequired,
  nameNewsCategoryNotRepeat,
  lengthTitle,
  validResult
]

export const getByIdRequestValidations = [
  idItemNavCategoryExists,
  validResult
]
export const patchRequestValidations = [
  validJWT,
  idItemNavCategoryExists,
  lengthTitle,
  validResult
]
export const deleteRequestValidations = [
  validJWT,
  idItemNavCategoryExists,
  validResult
]
export const restoreRequestValidations = [
  validJWT,
  idItemNavCategoryExists,
  validResult
]

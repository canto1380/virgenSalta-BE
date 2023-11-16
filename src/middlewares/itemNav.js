import { check } from "express-validator";
import validResult from './commons.js'

import {validJWT} from './authToken.js'
import AppError from '../errors/appError.js'

import {
  verifyIdExistsItemNav,
  verifyNameExistsItemNav
} from '../controllers/itemNav.controller.js'
import { verifyIdExistsItemNavCategory } from "../controllers/itemNavCategory.controller.js";
const fieldRequired = check(['title', 'url', 'idItemNavCategory'], 'Campo requerido').not().isEmpty()

const nameNewsNotRepeat = check('title').custom(async(title) => {
  if(!title) {
    return
  }
  const newsFound = await verifyNameExistsItemNav(title)
  if(newsFound !== null) {
    throw new AppError('El nombre de la sección ingresada ya existe', 400)
  }
})

const lenghtInput = check(
  "title",
  "El campo'Título' deben tener entre 5 y 50 caracteres"
).isLength({ min: 5, max: 50 });

const idItemNavExists = check('id').custom(async(id) => {
  const itemNavFound = await verifyIdExistsItemNav(id)
  if(!itemNavFound) {
    throw new AppError('No existe la sección buscada', 400)
  }
})
const verifyIdExistItemNavCategory = check('idItemNavCategory').custom(
  async (idItemNavCategory) => {
    if(!idItemNavCategory) {
      return
    } else {
      const idItemNavCategoryFound = await verifyIdExistsItemNavCategory(idItemNavCategory)
      if(idItemNavCategoryFound === null) {
        throw new AppError('El id de la categoria no existe', 400)
      }
    }
  }
)

export const postRequestValidations = [
  validJWT,
  fieldRequired,
  nameNewsNotRepeat,
  lenghtInput,
  verifyIdExistItemNavCategory,
  validResult
]

export const getByIdRequestValidations = [
  idItemNavExists,
  validResult
]
export const patchRequestValidations = [
  validJWT,
  idItemNavExists,
  lenghtInput,
  verifyIdExistItemNavCategory,
  validResult
]
export const deleteRequestValidations = [
  validJWT,
  idItemNavExists,
  validResult
]
export const restoreRequestValidations = [
  validJWT,
  idItemNavExists,
  validResult
]

import { check } from "express-validator";
import validResult from './commons.js'

import {validJWT} from './authToken.js'
import AppError from '../errors/appError.js'

import {
  verifyIdExistsNews,
  verifyNameExistsNews
} from '../controllers/news.controller.js'
import { verifyIdExistsNewsCategory } from "../controllers/newsCategory.controller.js";
const fieldRequired = check(['title', 'description', 'idNewsCategory'], 'Campo requerido').not().isEmpty()

const nameNewsNotRepeat = check('title').custom(async(title) => {
  if(!title) {
    return
  }
  const newsFound = await verifyNameExistsNews(title)
  if(newsFound !== null) {
    throw new AppError('El nombre de la noticia ingresada ya existe', 400)
  }
})

const lengthDescription = check(
  "description",
  "El campo 'Descripción' debe tener al menos 150 caracteres"
).isLength({ min: 150});

const lenghtInput = check(
  "title",
  "Los campos 'Título y Subtítulo' deben tener entre 10 y 150 caracteres"
).isLength({ min: 5, max: 150 });

const idNewsExists = check('id').custom(async(id) => {
  const newsFound = await verifyIdExistsNews(id)
  if(!newsFound) {
    throw new AppError('No existe la noticia buscada', 400)
  }
})
const verifyIdExistNewsCategory = check('idNewsCategory').custom(
  async (idNewsCategory) => {
    console.log(idNewsCategory)
    if(!idNewsCategory) {
      return
    } else {
      const idNewsCategoryFound = await verifyIdExistsNewsCategory(idNewsCategory)
      if(idNewsCategoryFound === null) {
        throw new AppError('El id de la categoria no existe', 400)
      }
    }
  }
)

export const postRequestValidations = [
  validJWT,
  fieldRequired,
  nameNewsNotRepeat,
  lengthDescription,
  lenghtInput,
  verifyIdExistNewsCategory,
  validResult
]

export const getByIdRequestValidations = [
  idNewsExists,
  validResult
]
export const patchRequestValidations = [
  validJWT,
  idNewsExists,
  // nameNewsNotRepeat,
  lengthDescription,
  lenghtInput,
  verifyIdExistNewsCategory,
  validResult
]
export const deleteRequestValidations = [
  validJWT,
  idNewsExists,
  validResult
]
export const restoreRequestValidations = [
  validJWT,
  idNewsExists,
  validResult
]

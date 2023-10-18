import { Router } from "express";

import {
  createImportantEventType,
  allImportantEventType,
  importantEventTypeById,
  updateImportantEventType,
  deleteImportantEventType,
  restoreImportantEventType
} from '../controllers/importantEventType.controller.js'

import {
  postRequestValidations,
  getByIdRequestValidations,
  patchRequestValidations,
  deleteRequestValidations,
  restoreRequestValidations

} from '../middlewares/importantEventType.js'

const router = Router()

router.post('/', postRequestValidations, createImportantEventType)
router.get('/', allImportantEventType)
router.get('/:id', getByIdRequestValidations, importantEventTypeById)
router.patch('/:id', patchRequestValidations, updateImportantEventType)
router.patch('/deleteImportantEventType/:id', deleteRequestValidations, deleteImportantEventType)
router.patch('/restoreImportantEventType/:id', restoreRequestValidations, restoreImportantEventType)

export default router
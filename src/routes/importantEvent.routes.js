import { Router } from "express";

import {
  createImportantEvent,
  allImportantEvent,
  importantEventById,
  updateImportantEvent,
  deleteImportantEvent,
  restoreImportantEvent
} from '../controllers/importantEvent.controller.js'

import {
  postRequestValidations,
  getByIdRequestValidations,
  patchRequestValidations,
  deleteRequestValidations,
  restoreRequestValidations

} from '../middlewares/importantEvent.js'

const router = Router()

router.post('/', postRequestValidations, createImportantEvent)
router.get('/', allImportantEvent)
router.get('/:id', getByIdRequestValidations, importantEventById)
router.patch('/:id', patchRequestValidations, updateImportantEvent)
router.patch('/deleteImportantEvent/:id', deleteRequestValidations, deleteImportantEvent)
router.patch('/restoreImportantEvent/:id', restoreRequestValidations, restoreImportantEvent)

export default router
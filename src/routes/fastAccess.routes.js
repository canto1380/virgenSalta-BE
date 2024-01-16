import { Router } from "express";
import {
  createFastAccess,
  allFastAccess,
  fastAccessById,
  updateFastAccess,
  deleteFastAccess,
  restoreFastAccess
} from '../controllers/fastAccess.controller.js'
import {
  deleteRequestValidations,
  getByIdRequestValidations,
  patchRequestValidations,
  postRequestValidations,
  restoreRequestValidations
 } from "../middlewares/fastAccess.js";

const router = Router()

router.post('/', postRequestValidations, createFastAccess)
router.get('/', allFastAccess)
router.get('/:id', getByIdRequestValidations, fastAccessById)
router.patch('/:id', patchRequestValidations, updateFastAccess)
router.patch('/deleteFastAccess/:id', deleteRequestValidations, deleteFastAccess)
router.patch('/restoreFastAccess/:id', restoreRequestValidations, restoreFastAccess)

export default router;
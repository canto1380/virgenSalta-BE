import { Router } from "express";
import {
  createFastAccess,
  allFastAccess,
  fastAccessById,
  updateFastAccess,
  deleteFastAccess,
  restoreFastAccess
} from '../controllers/fastAccess.controller.js'

const router = Router()

router.post('/', createFastAccess)
router.get('/', allFastAccess)
router.get('/:id', fastAccessById)
router.patch('/:id', updateFastAccess)
router.patch('/deleteFastAccess/:id', deleteFastAccess)
router.patch('/restoreFastAccess/:id', restoreFastAccess)

export default router;
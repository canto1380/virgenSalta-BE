import { Router } from 'express'
import {
  userList,
  createUser,
  userById,
  updateUser,
  deleteUser,
  restaurarUser,
  passwordUpdate,
  allUser,
  updatePass,
  userByNickname,
  userByEmail
} from '../controllers/user.controller.js'
import {
  deleteRequestValidations,
  getByIdRequestValidations,
  postRequestValidations,
  putRequestValidations,
  restoreRequestValidation,
  getAllRequestValidations,
  putPassRequestValidations,
} from '../middlewares/user.js'
import { resetPass, updatePassReset } from '../controllers/resetPass.controller.js'
const router = Router()

router.get('/allUser', allUser)
router.get('/', getAllRequestValidations, userList)
router.get('/resetPass', resetPass)
router.post('/createUser', postRequestValidations, createUser)
router.get('/:id', getByIdRequestValidations, userById)
router.get('/nick/:nickname', userByNickname)
router.get('/email/:email', userByEmail)
router.patch('/updatePassReset/:email', updatePassReset)
router.patch('/:id', putRequestValidations, updateUser)
router.patch('/updatePass/:id', putPassRequestValidations, updatePass)
router.put('/delete/:id', deleteRequestValidations, deleteUser)
router.put('/restore/:id', restoreRequestValidation, restaurarUser)

router.put('passwordUpdate', passwordUpdate)
export default router

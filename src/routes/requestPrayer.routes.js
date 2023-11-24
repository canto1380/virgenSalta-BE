import { Router } from 'express'
import { sendRequest } from '../controllers/requestPrayer.controller.js'

const router = Router()

router.post('/sendRequest', sendRequest)

export default router

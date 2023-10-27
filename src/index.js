import express from 'express'
import dotenv from 'dotenv'
import './database.js'
import cors from 'cors'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url'
import swaggerUI from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'
import { options } from './swagger/swaggerOptions.js'

import signinRoutes from './routes/signin.routes.js'
import userRoutes from './routes/user.routes.js'
import NewsCategoryRoutes from './routes/newsCategory.routes.js'
import NewsRoutes from './routes/news.routes.js'
import EventTypeRoutes from './routes/eventType.routes.js'
import DailyEventRoutes from './routes/dailyEvent.routes.js'
import ImportantEventTypeRoutes from './routes/importantEventType.routes.js'
import ImportantEvent from './routes/importantEvent.routes.js'

import process from 'process'

const app = express()
dotenv.config({ path: '.env' })
app.use(cors())
const corsOptions ={
  origin:'http://localhost:3000',
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(bodyParser.json({ limit: '50mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))

app.set('port', process.env.PORT || 4008)
app.listen(app.get('port'), () => {
  console.log(`Conectado desde el puerto ${app.get('port')}`)
})


app.use('/signin', signinRoutes)
app.use('/users', userRoutes)
app.use('/newsCategory', NewsCategoryRoutes)
app.use('/news', NewsRoutes)
app.use('/eventType', EventTypeRoutes)
app.use('/dailyEvent', DailyEventRoutes)
app.use('/importantEventType', ImportantEventTypeRoutes)
app.use('/importantEvent', ImportantEvent)


const specs = swaggerJSDoc(options)
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))

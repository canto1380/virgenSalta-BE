import express from 'express'
import dotenv from 'dotenv'
import './database.js'
import cors from 'cors'
import morgan from 'morgan'
import compression from 'compression'
import helmet from 'helmet'
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
import CarouselRoutes from './routes/carousel.routes.js'
import SpecialDaysRoutes from './routes/specialDays.routes.js'
import BackdropRoutes from './routes/backdrop.routes.js'
import HistoryRoutes from './routes/history.routes.js'
import ItemNavCategory from './routes/itemNavCategory.routes.js'
import ItemNavRoutes from './routes/itemNav.routes.js'
import RequestPrayerRoutes from './routes/requestPrayer.routes.js'
import FastAccess from './routes/fastAccess.routes.js'
import StatisticsRoutes from './routes/statistics.routes.js'
import FooterRoutes from './routes/footer.routes.js'
import ConfigurationsRoutes from './routes/configurations.routes.js'
import MessageVirgen from './routes/messageVirgen.routes.js'
import MessageJesus from './routes/messageJesus.routes.js'
import MessageGeneral from './routes/messageGeneral.routes.js'
import YouTubeRoutes from './routes/youtube.routes.js'
import { cacheMiddleware } from './middlewares/cache.js'

import process from 'process'

const app = express()
dotenv.config({ path: '.env' })

app.use(compression())
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }))
app.use(cors())
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
)

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(bodyParser.json({ limit: '10mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }))

const cacheControl = (req, res, next) => {
  if (req.method === 'GET') {
    res.set('Cache-Control', 'private, no-store')
  }
  next()
}

app.set('port', process.env.PORT || 4008)
app.listen(app.get('port'), () => {
  console.log(`Conectado desde el puerto ${app.get('port')}`)
})


app.use('/signin', signinRoutes)
app.use('/users', userRoutes)

// Server-side in-memory cache (1 hour) — browser is told not to cache API responses
app.use('/configuration', cacheControl, cacheMiddleware('configuration', 3600), ConfigurationsRoutes)
app.use('/itemNavCategory', cacheControl, cacheMiddleware('itemNavCategory', 3600), ItemNavCategory)
app.use('/itemNav', cacheControl, cacheMiddleware('itemNav', 3600), ItemNavRoutes)
app.use('/footer', cacheControl, cacheMiddleware('footer', 3600), FooterRoutes)

// Server-side in-memory cache (5 minutes)
app.use('/newsCategory', cacheControl, NewsCategoryRoutes)
app.use('/news', cacheControl, NewsRoutes)
app.use('/eventType', cacheControl, EventTypeRoutes)
app.use('/dailyEvent', cacheControl, DailyEventRoutes)
app.use('/importantEventType', cacheControl, ImportantEventTypeRoutes)
app.use('/importantEvent', cacheControl, ImportantEvent)
app.use('/carousel', cacheControl, CarouselRoutes)
app.use('/specialDays', cacheControl, SpecialDaysRoutes)
app.use('/backdrop', cacheControl, BackdropRoutes)
app.use('/history', cacheControl, HistoryRoutes)
app.use('/fastAccess', cacheControl, FastAccess)
app.use('/statistics', cacheControl, StatisticsRoutes)
app.use('/messageVirgen', cacheControl, MessageVirgen)
app.use('/messageJesus', cacheControl, MessageJesus)
app.use('/messageGeneral', cacheControl, MessageGeneral)

app.use('/requestPrayer', RequestPrayerRoutes)
app.use('/', YouTubeRoutes)
const specs = swaggerJSDoc(options)
app.use('/docs', swaggerUI.serve, swaggerUI.setup(specs))

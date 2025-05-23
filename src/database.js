import mongoose from 'mongoose'
import dotenv from 'dotenv'
import signale from 'signale'
import seedersUp from './utils/seeders.js'

dotenv.config({ path: '.env' })

const { MONGO_HOST, MONGO_PORT, MONGO_DB } = process.env

const connUrl = process.env.NODE_ENV === 'production'
  ? process.env.URL_SERVER_PRODUCTION
  : process.env.URL_SERVER_LOCAL;

// Solo para debug en producción, remover más tarde
console.log('connUrl', connUrl)

// Evita warning de futuras versiones de Mongoose
mongoose.set('strictQuery', false);

mongoose.connect(connUrl)
  .then(success => {
    signale.success('Database connected')
    seedersUp()
  })
  .catch(error => signale.error(error))

const connection = mongoose.connection
connection
  .once('open', () => {
    console.log(`Conectado a la DB: *** ${MONGO_DB} ***`)
  })
  .on('error', err => {
    return(err)
  })

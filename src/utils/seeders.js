import bcrypt from 'bcrypt'
import NewsCategory from '../models/newsCategory.model.js'
import User from '../models/user.model.js'

const password = await bcrypt.hash('2203casa', 8)

const dataUser = [
  {
    name: 'Juan',
    surname: 'Perez',
    email: 'email1@gmail.com',
    password,
    phone: 3815479768,
    birthdate: '1993-09-16',
    nickname: 'email1'
  },
  {
    name: 'Maria',
    surname: 'Paz',
    email: 'email2@gmail.com',
    password,
    phone: 3815479768,
    birthdate: '1993-09-16',
    nickname: 'email2'
  },
  {
    name: 'Jose',
    surname: 'Ruiz',
    email: 'email3@gmail.com',
    password,
    phone: 3815479768,
    birthdate: '1993-09-16',
    nickname: 'email3'
  }
]
const dataNewsCategory = [
  {
    nameCategory: 'Apariciones de la Virgen',
    deleted: false,
    backdrop: 'https://www.todowebsalta.com.ar/wp-content/uploads/2020/09/virgen-del-cerro.jpg'
  },
  {
    nameCategory: 'Historia del Santuario',
    deleted: false,
    backdrop: 'https://www.todowebsalta.com.ar/wp-content/uploads/2020/09/virgen-del-cerro.jpg'
  },
  {
    nameCategory: 'Conferencias',
    deleted: false,
    backdrop: 'https://www.todowebsalta.com.ar/wp-content/uploads/2020/09/virgen-del-cerro.jpg'
  },
  {
    nameCategory: 'Encuentro mundial de jóvenes',
    deleted: false,
    backdrop: 'https://www.todowebsalta.com.ar/wp-content/uploads/2020/09/virgen-del-cerro.jpg'
  },
  {
    nameCategory: 'Consagraciones',
    deleted: false,
    backdrop: 'https://www.todowebsalta.com.ar/wp-content/uploads/2020/09/virgen-del-cerro.jpg'
  },
  {
    nameCategory: 'Coordinadores y Misioneros',
    deleted: false,
    backdrop: 'https://www.todowebsalta.com.ar/wp-content/uploads/2020/09/virgen-del-cerro.jpg'
  }

]

const seedersUp = async () => {
  // try {
  //   await NewsCategory.insertMany(dataNewsCategory)
  //   await User.insertMany(dataUser)
  // } catch (error) {
  //   return error
  // }
}

export default seedersUp

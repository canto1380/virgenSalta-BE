import bcrypt from 'bcrypt'
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

const seedersUp = async () => {
  try {
    await User.insertMany(dataUser)
  } catch (error) {
    return error
  }
}

export default seedersUp

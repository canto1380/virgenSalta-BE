import bcrypt from 'bcrypt'
import NewsCategory from '../models/newsCategory.model.js'
import User from '../models/user.model.js'
import News from '../models/news.model.js'
import EventType from '../models/eventType.model.js'
import DailyEvent from '../models/dailyEvent.model.js'

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
    nameCategory: 'Apariciones de la Virgenss',
    deleted: false,
    backdrop: 'https://firebasestorage.googleapis.com/v0/b/virgen-salta-4f8e3.appspot.com/o/img-categorias%2Fbackdrop-coordinadores-misiones.JPG?alt=media&token=e03d6f41-306f-482e-962f-3a9630c207c1&_gl=1*1czvteu*_ga*MTAyNjkyMzAyMy4xNjg1NTg5MzY1*_ga_CW55HF8NVT*MTY4NTczNTM1Ny4xMi4xLjE2ODU3MzcwNDQuMC4wLjA.'
  },
  {
    nameCategory: 'Historia del Santuario',
    deleted: false,
    backdrop: 'https://firebasestorage.googleapis.com/v0/b/virgen-salta-4f8e3.appspot.com/o/img-categorias%2Fbackdrop-consagraciones.JPG?alt=media&token=a9a6acc2-33b0-4b4b-ba61-4f8fb8266545&_gl=1*1o7aa7n*_ga*MTAyNjkyMzAyMy4xNjg1NTg5MzY1*_ga_CW55HF8NVT*MTY4NTczNTM1Ny4xMi4xLjE2ODU3MzcwMzguMC4wLjA.'
  },
  {
    nameCategory: 'Avisos importantes',
    deleted: false,
    backdrop: 'https://firebasestorage.googleapis.com/v0/b/virgen-salta-4f8e3.appspot.com/o/img-categorias%2Fbackdrop-encuentro-jovenes.jpg?alt=media&token=523fa34b-cfe7-4d11-a1b5-d3bd78aee4bc&_gl=1*1p759r7*_ga*MTAyNjkyMzAyMy4xNjg1NTg5MzY1*_ga_CW55HF8NVT*MTY4NTczNTM1Ny4xMi4xLjE2ODU3MzcwNDcuMC4wLjA.'
  },
  {
    nameCategory: 'Mensajes de la Virgen',
    deleted: false,
    backdrop: 'https://firebasestorage.googleapis.com/v0/b/virgen-salta-4f8e3.appspot.com/o/img-categorias%2Fbackdrop-historia-santuario.jpeg?alt=media&token=81a26037-60cd-442d-8fe8-d532b2286e7e&_gl=1*dcx98f*_ga*MTAyNjkyMzAyMy4xNjg1NTg5MzY1*_ga_CW55HF8NVT*MTY4NTczNTM1Ny4xMi4xLjE2ODU3MzcwNTEuMC4wLjA.'
  },
  {
    nameCategory: 'Conferencias',
    deleted: false,
    backdrop: 'https://firebasestorage.googleapis.com/v0/b/virgen-salta-4f8e3.appspot.com/o/img-categorias%2Fbackdrop-historia-santuario.jpeg?alt=media&token=81a26037-60cd-442d-8fe8-d532b2286e7e&_gl=1*dcx98f*_ga*MTAyNjkyMzAyMy4xNjg1NTg5MzY1*_ga_CW55HF8NVT*MTY4NTczNTM1Ny4xMi4xLjE2ODU3MzcwNTEuMC4wLjA.'
  },
  {
    nameCategory: 'Encuentro mundial de jóvenes',
    deleted: false,
    backdrop: 'https://firebasestorage.googleapis.com/v0/b/virgen-salta-4f8e3.appspot.com/o/img-categorias%2Fbackdrop-encuentro-jovenes.jpg?alt=media&token=523fa34b-cfe7-4d11-a1b5-d3bd78aee4bc&_gl=1*1p759r7*_ga*MTAyNjkyMzAyMy4xNjg1NTg5MzY1*_ga_CW55HF8NVT*MTY4NTczNTM1Ny4xMi4xLjE2ODU3MzcwNDcuMC4wLjA.'
  },
  {
    nameCategory: 'Consagraciones',
    deleted: false,
    backdrop: 'https://firebasestorage.googleapis.com/v0/b/virgen-salta-4f8e3.appspot.com/o/img-categorias%2Fbackdrop-coordinadores-misiones.JPG?alt=media&token=e03d6f41-306f-482e-962f-3a9630c207c1&_gl=1*1czvteu*_ga*MTAyNjkyMzAyMy4xNjg1NTg5MzY1*_ga_CW55HF8NVT*MTY4NTczNTM1Ny4xMi4xLjE2ODU3MzcwNDQuMC4wLjA.'
  },
  {
    nameCategory: 'Calendario',
    deleted: false,
    backdrop: 'https://firebasestorage.googleapis.com/v0/b/virgen-salta-4f8e3.appspot.com/o/img-categorias%2Fbackdrop-consagraciones.JPG?alt=media&token=a9a6acc2-33b0-4b4b-ba61-4f8fb8266545&_gl=1*1o7aa7n*_ga*MTAyNjkyMzAyMy4xNjg1NTg5MzY1*_ga_CW55HF8NVT*MTY4NTczNTM1Ny4xMi4xLjE2ODU3MzcwMzguMC4wLjA.'
  },
  {
    nameCategory: 'Servicios',
    deleted: false,
    backdrop: 'https://firebasestorage.googleapis.com/v0/b/virgen-salta-4f8e3.appspot.com/o/img-categorias%2Fbackdrop-conferencias.jpg?alt=media&token=88d3c8e6-4f61-4ada-b63d-38290a0174d7&_gl=1*znt9uy*_ga*MTAyNjkyMzAyMy4xNjg1NTg5MzY1*_ga_CW55HF8NVT*MTY4NTczNTM1Ny4xMi4xLjE2ODU3MzcwMzMuMC4wLjA.'
  },
  {
    nameCategory: 'Coordinadores y Misioneros',
    deleted: false,
    backdrop: 'https://firebasestorage.googleapis.com/v0/b/virgen-salta-4f8e3.appspot.com/o/img-categorias%2Fbackdrop-apariciones-virgen.jpg?alt=media&token=d2f9e303-1493-47a5-8686-57de7bc7fe79&_gl=1*16xj8h0*_ga*MTAyNjkyMzAyMy4xNjg1NTg5MzY1*_ga_CW55HF8NVT*MTY4NTczNTM1Ny4xMi4xLjE2ODU3MzcwMzAuMC4wLjA.'
  }

]

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const idPhotos = [
  /**Google Drive **/
  // '1TubkJ5KKr8VlmiGk9uXDV_6n6JtBgLdQ',
  // '1A_pgdwNhExm-Da-tO_P59BRmaBgWWP_h',
  // '1uFnd8PLCmeZx6WkdAmbJdRhmTKx5x8Nc',
  // '14snKQsM1k40fYJqhFUI_0K9VvNjSPNmG',
  // '1P1fWg-qI01IUsqNh1zswPDSSjlYoDsrr',
  // '1GQh0IZE5w6sWBnguDmD22sxzHa50Sg-h',

  /**Firebase **/
  'https://firebasestorage.googleapis.com/v0/b/virgen-salta-4f8e3.appspot.com/o/img-noticias%2Fbackdrop-historia-santuario.jpeg?alt=media&token=817afef1-773b-4abd-85e5-65219cb88cbc&_gl=1*gein4m*_ga*MTAyNjkyMzAyMy4xNjg1NTg5MzY1*_ga_CW55HF8NVT*MTY4NTczNTM1Ny4xMi4xLjE2ODU3MzY2NTkuMC4wLjA.',
  'https://firebasestorage.googleapis.com/v0/b/virgen-salta-4f8e3.appspot.com/o/img-noticias%2Fbackdrop-encuentro-jovenes.jpg?alt=media&token=ef596252-1204-499e-8c65-8aef94394bad&_gl=1*5p9spt*_ga*MTAyNjkyMzAyMy4xNjg1NTg5MzY1*_ga_CW55HF8NVT*MTY4NTczNTM1Ny4xMi4xLjE2ODU3MzY2NTIuMC4wLjA.',
  'https://firebasestorage.googleapis.com/v0/b/virgen-salta-4f8e3.appspot.com/o/img-noticias%2Fbackdrop-coordinadores-misiones.JPG?alt=media&token=93984c16-5419-403f-95c9-47a805531064&_gl=1*11pjfnw*_ga*MTAyNjkyMzAyMy4xNjg1NTg5MzY1*_ga_CW55HF8NVT*MTY4NTczNTM1Ny4xMi4xLjE2ODU3MzY2NDUuMC4wLjA.',
  'https://firebasestorage.googleapis.com/v0/b/virgen-salta-4f8e3.appspot.com/o/img-noticias%2Fbackdrop-consagraciones.JPG?alt=media&token=a3d4ab8c-5d61-4b30-9973-5efc3392c427&_gl=1*1ugkluh*_ga*MTAyNjkyMzAyMy4xNjg1NTg5MzY1*_ga_CW55HF8NVT*MTY4NTczNTM1Ny4xMi4xLjE2ODU3MzY2MzcuMC4wLjA.',
  'https://firebasestorage.googleapis.com/v0/b/virgen-salta-4f8e3.appspot.com/o/img-noticias%2Fbackdrop-conferencias.jpg?alt=media&token=b205f209-1689-46ba-a484-4c275456885e&_gl=1*1gqlt6i*_ga*MTAyNjkyMzAyMy4xNjg1NTg5MzY1*_ga_CW55HF8NVT*MTY4NTczNTM1Ny4xMi4xLjE2ODU3MzY2MzMuMC4wLjA.',
  'https://firebasestorage.googleapis.com/v0/b/virgen-salta-4f8e3.appspot.com/o/img-noticias%2Fbackdrop-apariciones-virgen.jpg?alt=media&token=bc6b8157-6e39-4fda-8c04-34d86bfdda82&_gl=1*xmgnhb*_ga*MTAyNjkyMzAyMy4xNjg1NTg5MzY1*_ga_CW55HF8NVT*MTY4NTczNTM1Ny4xMi4xLjE2ODU3MzY2MTEuMC4wLjA.',
  'https://firebasestorage.googleapis.com/v0/b/virgen-salta-4f8e3.appspot.com/o/img-noticias%2Fnoticia9.jpeg?alt=media&token=e813b15e-a656-41f2-8cc4-3aee095f6e56&_gl=1*gp0ppf*_ga*MTAyNjkyMzAyMy4xNjg1NTg5MzY1*_ga_CW55HF8NVT*MTY4NTczNTM1Ny4xMi4xLjE2ODU3MzY4OTcuMC4wLjA.',
  'https://firebasestorage.googleapis.com/v0/b/virgen-salta-4f8e3.appspot.com/o/img-noticias%2Fnoticia8.jpeg?alt=media&token=9ae86034-32ac-4f73-b2ac-e578e8710946&_gl=1*ru6nui*_ga*MTAyNjkyMzAyMy4xNjg1NTg5MzY1*_ga_CW55HF8NVT*MTY4NTczNTM1Ny4xMi4xLjE2ODU3MzY4OTIuMC4wLjA.',
  'https://firebasestorage.googleapis.com/v0/b/virgen-salta-4f8e3.appspot.com/o/img-noticias%2Fnoticia7.jpeg?alt=media&token=b493dc51-387c-4e04-9b9a-3422df3f128e&_gl=1*172d382*_ga*MTAyNjkyMzAyMy4xNjg1NTg5MzY1*_ga_CW55HF8NVT*MTY4NTczNTM1Ny4xMi4xLjE2ODU3MzY4ODguMC4wLjA.',
  'https://firebasestorage.googleapis.com/v0/b/virgen-salta-4f8e3.appspot.com/o/img-noticias%2Fnoticia6.jpeg?alt=media&token=c97925ed-81c5-42cc-a70e-0235bd53c48a&_gl=1*1i6o4uj*_ga*MTAyNjkyMzAyMy4xNjg1NTg5MzY1*_ga_CW55HF8NVT*MTY4NTczNTM1Ny4xMi4xLjE2ODU3MzY4ODMuMC4wLjA.',
  'https://firebasestorage.googleapis.com/v0/b/virgen-salta-4f8e3.appspot.com/o/img-noticias%2Fnoticia5.jpeg?alt=media&token=7fee5eb8-2ba3-4e0f-a3ab-73230e808c4c&_gl=1*qtxm5l*_ga*MTAyNjkyMzAyMy4xNjg1NTg5MzY1*_ga_CW55HF8NVT*MTY4NTczNTM1Ny4xMi4xLjE2ODU3MzY4NzkuMC4wLjA.',
  'https://firebasestorage.googleapis.com/v0/b/virgen-salta-4f8e3.appspot.com/o/img-noticias%2Fnoticia4.jpeg?alt=media&token=880e35aa-74c5-472b-9d25-d6978702e6b0&_gl=1*3iy2y4*_ga*MTAyNjkyMzAyMy4xNjg1NTg5MzY1*_ga_CW55HF8NVT*MTY4NTczNTM1Ny4xMi4xLjE2ODU3MzY4NzYuMC4wLjA.',
  'https://firebasestorage.googleapis.com/v0/b/virgen-salta-4f8e3.appspot.com/o/img-noticias%2Fnoticia3.jpeg?alt=media&token=4ec47862-50bd-4457-97d4-a5326f359860&_gl=1*9p073y*_ga*MTAyNjkyMzAyMy4xNjg1NTg5MzY1*_ga_CW55HF8NVT*MTY4NTczNTM1Ny4xMi4xLjE2ODU3MzY4NzMuMC4wLjA.',
  'https://firebasestorage.googleapis.com/v0/b/virgen-salta-4f8e3.appspot.com/o/img-noticias%2Fnoticia2.jpeg?alt=media&token=0b9b55f8-2789-446d-a9ef-34169328cb9d&_gl=1*1l8deoy*_ga*MTAyNjkyMzAyMy4xNjg1NTg5MzY1*_ga_CW55HF8NVT*MTY4NTczNTM1Ny4xMi4xLjE2ODU3MzY4NjkuMC4wLjA.',
  'https://firebasestorage.googleapis.com/v0/b/virgen-salta-4f8e3.appspot.com/o/img-noticias%2Fnoticia10.jpeg?alt=media&token=84b16069-6862-480a-aaa7-dea0a77f36db&_gl=1*190spt3*_ga*MTAyNjkyMzAyMy4xNjg1NTg5MzY1*_ga_CW55HF8NVT*MTY4NTczNTM1Ny4xMi4xLjE2ODU3MzY4NjYuMC4wLjA.',
  'https://firebasestorage.googleapis.com/v0/b/virgen-salta-4f8e3.appspot.com/o/img-noticias%2Fnoticia1.jpeg?alt=media&token=a23c6bc8-0f1b-4e45-8880-26b2669479aa&_gl=1*15olakb*_ga*MTAyNjkyMzAyMy4xNjg1NTg5MzY1*_ga_CW55HF8NVT*MTY4NTczNTM1Ny4xMi4xLjE2ODU3MzY4NjAuMC4wLjA.',

]
const dataNews = async () => {
  const newsCategory = await NewsCategory.find();

  let newsAdd = []
  const data = newsCategory.map(async (d) => {
    for (let i = 0; i < 6; i++) {
      const news = {
        title: `Este es un titulo de prueba para la noticia ${i + 1} cargadas - Deben ser modificados al momento de cargar la noticia ${d._id}`,
        subtitle: `Este es un subtitulo de prueba para la noticia ${i + 1} cargada - Deben ser modificados al momento de cargar la noticia ${i + 1}`,
        caption: `Este es un pie de foto de prueba para la noticia ${i + 1}`,
        description: "Lorem ipsum dolor sit amet,\n\n" +
          "consectetur adipiscing elit. In varius porttitor dictum. In aliquet mauris vitae viverra consequat. Fusce eget tortor et dui vehicula vulputate. Praesent at tincidunt lectus, sed tincidunt eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris at venenatis mauris. Fusce lacinia purus nisi, a pharetra tellus facilisis consequat. Donec mattis varius turpis, nec malesuada diam euismod vitae. Morbi molestie maximus ligula id pretium. Vivamus dapibus iaculis gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Fusce nisi ex, efficitur sit amet tempus eget, pulvinar et felis. Phasellus eget turpis in orci luctus posuere. Sed et elementum orci, in ultrices diam. Nam sodales ante eget est lobortis condimentum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse ultrices aliquam interdum. Curabitur venenatis purus metus, eget gravida lectus convallis nec. Proin quis diam non nibh ullamcorper scelerisque commodo sed ligula. Sed lorem leo, gravida non porttitor quis, consectetur sed sapien. Nulla ornare nulla id ante ornare, nec tincidunt enim porta. Vestibulum dapibus semper augue, ut bibendum lectus accumsan ac. Pellentesque gravida ante eu massa varius, sit amet condimentum tellus egestas. Praesent non mauris gravida, feugiat erat et, vehicula risus. Etiam rhoncus volutpat libero, ac venenatis magna blandit id. Duis a varius magna. Nullam ultrices sodales lacus eget rhoncus. Nunc id gravida lacus, sit amet convallis est. Cras sit amet sodales risus. Cras gravida id ligula vel convallis. Mauris vestibulum fermentum turpis ut suscipit. Nunc ut aliquet leo. In pellentesque, nisl eget malesuada imperdiet, metus elit sollicitudin risus, sit amet consectetur sapien dolor vel libero. Mauris a sagittis augue. Praesent feugiat rhoncus sem, et aliquam libero tristique ac. Nullam gravida luctus odio non pellentesque. Fusce malesuada euismod tellus, faucibus rhoncus libero lacinia id. Aenean vitae faucibus leo, sed mollis lacus. Fusce finibus venenatis sagittis. Cras elementum ante elit, sit amet tincidunt nisl consectetur vitae. Nullam fringilla pulvinar egestas. Etiam eu tincidunt risus, vel sollicitudin turpis. Sed porttitor rhoncus tortor, eget ultricies nisl semper a. Mauris fringilla lorem imperdiet mauris bibendum, sed scelerisque nisi congue. Quisque ut lectus justo. Quisque vitae dui vitae turpis maximus congue ut",
        idNewsCategory: d._id,
        photos: [
          idPhotos[getRandomInt(16)],
          idPhotos[getRandomInt(16)],
          idPhotos[getRandomInt(16)]
        ]
      }
      newsAdd.push(news)
    }
  })
  return newsAdd
}

const dataEventType = [
  {
    eventName: 'Misa',
    deleted: false
  },
  {
    eventName: 'Celebraciones',
    deleted: false
  },
]
const dataDailyEvent = async () => {
  const eventType = await EventType.find()
  let dailyEventAdd = []
  const dias = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", 'Domingo'];
  const hora = ["19:30", "18", "18:30", "19", "20", "20:30"];
  const data = eventType.map(async (d) => {
    for (let i = 0; i < 9; i++) {
      const dailyEvent = {
        day: dias[Math.floor(Math.random() * dias.length)],
        idEventType: d._id,
        time: hora[Math.floor(Math.random() * hora.length)],
        text: 'Texto de ejemplo - Misa',
        additionalText: "Texto adicional. No requerido",
      }
      dailyEventAdd.push(dailyEvent)
    }
  })
  return dailyEventAdd
}

const seedersUp = async () => {
  try {
    // const db = process.env.MONGO_DB
    // mongoose.connection.db.dropDatabase()

    // await EventType.insertMany(dataEventType)
    // await DailyEvent.insertMany(await dataDailyEvent())
    await User.insertMany(dataUser)

    await News.insertMany(await dataNews())
    await NewsCategory.insertMany(dataNewsCategory)
    // await NewsCategory.deleteMany()
    // await News.deleteMany()
  } catch (error) {
    return error
  }
}

export default seedersUp

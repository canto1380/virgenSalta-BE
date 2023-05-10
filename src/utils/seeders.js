import bcrypt from 'bcrypt'
import NewsCategory from '../models/newsCategory.model.js'
import User from '../models/user.model.js'
import News from '../models/news.model.js'

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
    backdrop:'https://drive.google.com/file/d/1TubkJ5KKr8VlmiGk9uXDV_6n6JtBgLdQ/view?usp=share_link'
    // backdrop: 'https://www.todowebsalta.com.ar/wp-content/uploads/2020/09/virgen-del-cerro.jpg'
  },
  {
    nameCategory: 'Historia del Santuario',
    deleted: false,
    backdrop: 'https://drive.google.com/file/d/1GQh0IZE5w6sWBnguDmD22sxzHa50Sg-h/view?usp=share_link'
  },
  {
    nameCategory: 'Conferencias',
    deleted: false,
    backdrop: 'https://drive.google.com/file/d/1A_pgdwNhExm-Da-tO_P59BRmaBgWWP_h/view?usp=share_link'
  },
  {
    nameCategory: 'Encuentro mundial de jóvenes',
    deleted: false,
    backdrop: 'https://drive.google.com/file/d/1P1fWg-qI01IUsqNh1zswPDSSjlYoDsrr/view?usp=share_link'
  },
  {
    nameCategory: 'Consagraciones',
    deleted: false,
    backdrop: 'https://drive.google.com/file/d/1uFnd8PLCmeZx6WkdAmbJdRhmTKx5x8Nc/view?usp=share_link'
  },
  {
    nameCategory: 'Coordinadores y Misioneros',
    deleted: false,
    backdrop: 'https://drive.google.com/file/d/14snKQsM1k40fYJqhFUI_0K9VvNjSPNmG/view?usp=share_link'
  }

]

const dataNews = async() => {
  const newsCategory = await NewsCategory.find();

  let newsAdd =[]
  const data = newsCategory.map(async (d) => {
    for(let i = 0; i < 6; i++) {
        const news = {
          title: `Este es un titulo de prueba para la noticia ${i+1} cargadas - Deben ser modificados al momento de cargar la noticia ${i+1}`,
          subtitle:`Este es un subtitulo de prueba para la noticia ${i+1} cargada - Deben ser modificados al momento de cargar la noticia ${i+1}`,
          caption:`Este es un pie de foto de prueba para la noticia ${i+1}`,
          description:"Lorem ipsum dolor sit amet,\n\n" +
          "consectetur adipiscing elit. In varius porttitor dictum. In aliquet mauris vitae viverra consequat. Fusce eget tortor et dui vehicula vulputate. Praesent at tincidunt lectus, sed tincidunt eros. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris at venenatis mauris. Fusce lacinia purus nisi, a pharetra tellus facilisis consequat. Donec mattis varius turpis, nec malesuada diam euismod vitae. Morbi molestie maximus ligula id pretium. Vivamus dapibus iaculis gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Fusce nisi ex, efficitur sit amet tempus eget, pulvinar et felis. Phasellus eget turpis in orci luctus posuere. Sed et elementum orci, in ultrices diam. Nam sodales ante eget est lobortis condimentum. Interdum et malesuada fames ac ante ipsum primis in faucibus. Suspendisse ultrices aliquam interdum. Curabitur venenatis purus metus, eget gravida lectus convallis nec. Proin quis diam non nibh ullamcorper scelerisque commodo sed ligula. Sed lorem leo, gravida non porttitor quis, consectetur sed sapien. Nulla ornare nulla id ante ornare, nec tincidunt enim porta. Vestibulum dapibus semper augue, ut bibendum lectus accumsan ac. Pellentesque gravida ante eu massa varius, sit amet condimentum tellus egestas. Praesent non mauris gravida, feugiat erat et, vehicula risus. Etiam rhoncus volutpat libero, ac venenatis magna blandit id. Duis a varius magna. Nullam ultrices sodales lacus eget rhoncus. Nunc id gravida lacus, sit amet convallis est. Cras sit amet sodales risus. Cras gravida id ligula vel convallis. Mauris vestibulum fermentum turpis ut suscipit. Nunc ut aliquet leo. In pellentesque, nisl eget malesuada imperdiet, metus elit sollicitudin risus, sit amet consectetur sapien dolor vel libero. Mauris a sagittis augue. Praesent feugiat rhoncus sem, et aliquam libero tristique ac. Nullam gravida luctus odio non pellentesque. Fusce malesuada euismod tellus, faucibus rhoncus libero lacinia id. Aenean vitae faucibus leo, sed mollis lacus. Fusce finibus venenatis sagittis. Cras elementum ante elit, sit amet tincidunt nisl consectetur vitae. Nullam fringilla pulvinar egestas. Etiam eu tincidunt risus, vel sollicitudin turpis. Sed porttitor rhoncus tortor, eget ultricies nisl semper a. Mauris fringilla lorem imperdiet mauris bibendum, sed scelerisque nisi congue. Quisque ut lectus justo. Quisque vitae dui vitae turpis maximus congue ut",
          idNewsCategory:d._id,
          photos: [
            'https://drive.google.com/file/d/14snKQsM1k40fYJqhFUI_0K9VvNjSPNmG/view?usp=share_link',
            'https://drive.google.com/file/d/1uFnd8PLCmeZx6WkdAmbJdRhmTKx5x8Nc/view?usp=share_link',
            'https://drive.google.com/file/d/1P1fWg-qI01IUsqNh1zswPDSSjlYoDsrr/view?usp=share_link'
          ]
        }
        newsAdd.push(news)
    }
  })
  return newsAdd
}

const seedersUp = async () => {
  try {
    const db = process.env.MONGO_DB
    // mongoose.connection.db.dropDatabase()
    await User.insertMany(dataUser)
    await NewsCategory.insertMany(dataNewsCategory)
    await News.insertMany(await dataNews())
    // await NewsCategory.deleteMany()
    // await News.deleteMany()
  } catch (error) {
    return error
  }
}

export default seedersUp

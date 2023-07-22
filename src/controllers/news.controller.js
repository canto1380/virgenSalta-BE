import News from "../models/news.model.js"

export const createNews = async(req, res) => {
  try {
    const body = req.body
    const newNews = new News(body)
    await newNews.save()
    res.status(200).json(newNews)
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}

export const allNews = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      order = "",
      sortBy = "",
      idNewsCategory,
      deleted,
    } = req.query;
    let orderSearch = order ? order : "desc";
    let sortBySearch = sortBy ? sortBy : "createdAt";
    const regex = new RegExp(search, "i");
    let filters = {
      title: regex,
    };
    if(deleted) filters ={...filters, deleted}
    if(idNewsCategory && idNewsCategory !== '')
      filters = { ...filters, idNewsCategory}
    const countNews = await News.countDocuments();
    const findTotal = await News.find(filters)
    const allNews = await News.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort([[sortBySearch, orderSearch]])
      .populate({path: 'idNewsCategory'})
    const foundRegisters = allNews.length

    res.status(200).json({
      allNews,
      totalRegister: findTotal.length,
      foundRegisters,
      totalPages: Math.ceil( countNews/limit ),
      currentPage: page
    });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const newsById = async (req, res) => {
  try {
    const {id} = req.params
    const news = await News.findById(id)
    .populate({path: 'idNewsCategory'})
    res.status(200).json(news)
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const verifyIdExistsNews = (id) => {
  const news = News.findOne({_id: id})
  return news
}

export const verifyNameExistsNews = async(title) => {
  const news = title[0].toUpperCase() + title.slice(1)
  const verifyExist = await News.findOne({title: news})
  return verifyExist
}

export const updateNews = async (req, res) => {
  try {
    const body = req.body
    const{id} = req.params
    const newsUpdated = await News.findByIdAndUpdate(id, body, {new: true})
    res.status(200).json({message: 'Noticia actualizada con éxito', newsUpdated})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const deleteNews = async (req, res) => {
  try {
    const {id} = req.params
    const news = await News.findById(id)
    news.deleted = true
    news.save()
    res.status(200).json({meesage: 'Noticia eliminada con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const restoreNews = async (req, res) => {
  try {
    const {id} = req.params
    const news = await News.findById(id)
    news.deleted = false
    news.save()
    res.status(200).json({meesage: 'Noticia restaurada con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

import NewsCategory from "../models/newsCategory.model.js"

export const createNewsCategory = async(req, res) => {
  try {
    const body = req.body
    const newNewsCategory = new NewsCategory(body)
    await newNewsCategory.save()
    res.status(200).json(newNewsCategory)
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}

export const allNewsCategory = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      search = "",
      order = "",
      sortBy = "",
      deleted,
    } = req.query;
    let orderSearch = order ? order : "desc";
    let sortBySearch = sortBy ? sortBy : "createdAt";
    const regex = new RegExp(search, "i");

    let filters = {
      nameCategory: regex,
    };
    if(deleted) filters ={...filters, deleted}
    const countNewsCategory = await NewsCategory.countDocuments();
    const findTotal = await NewsCategory.find(filters)
    const allNewsCategory = await NewsCategory.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort([[sortBySearch, orderSearch]])
    const foundRegisters = allNewsCategory.length

    res.status(200).json({
      allNewsCategory,
      totalRegister: findTotal.length,
      foundRegisters,
      totalPages: Math.ceil( countNewsCategory/limit ),
      currentPage: page
    });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const newsCategoryById = async (req, res) => {
  try {
    const {id} = req.params
    const newsCategory = await NewsCategory.findById(id)
    res.status(200).json(newsCategory)
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const verifyIdExistsNewsCategory = (id) => {
  const newsCategory = NewsCategory.findOne({_id: id})
  return newsCategory
}

export const verifyNameExistsNewsCategory = async(nameCategory) => {
  const newsCategory = nameCategory[0].toUpperCase() + nameCategory.slice(1)
  const verifyExist = await NewsCategory.findOne({nameCategory: newsCategory})
  return verifyExist
}

export const updateNewsCategory = async (req, res) => {
  try {
    const body = req.body
    const{id} = req.params
    const newsCategoryUpdated = await NewsCategory.findByIdAndUpdate(id, body, {new: true})
    res.status(200).json({message: 'Categoría actualizada con éxito', newsCategoryUpdated})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const deleteNewsCategory = async (req, res) => {
  try {
    const {id} = req.params
    const newsCategory = await NewsCategory.findById(id)
    newsCategory.deleted = true
    newsCategory.save()
    res.status(200).json({meesage: 'Cateogoría eliminada con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const restoreNewsCategory = async (req, res) => {
  try {
    const {id} = req.params
    const newsCategory = await NewsCategory.findById(id)
    newsCategory.deleted = false
    newsCategory.save()
    res.status(200).json({meesage: 'Categoría restaurada con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

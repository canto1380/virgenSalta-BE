import History from "../models/history.model.js"

export const createHistory = async(req, res) => {
  try {
    const body = req.body
    const newHistory = new History(body)
    await newHistory.save()
    res.status(200).json(newHistory)
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}

export const allHistory = async (req, res) => {
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
      title: regex,
    };
    if(deleted) filters ={...filters, deleted}
    const countHistory = await History.countDocuments();
    const findTotal = await History.find(filters)
    const allHistory = await History.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort([[sortBySearch, orderSearch]])
    const foundRegisters = allHistory.length

    res.status(200).json({
      allHistory,
      totalRegister: findTotal.length,
      foundRegisters,
      totalPages: Math.ceil( countHistory/limit ),
      currentPage: page
    });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const historyById = async (req, res) => {
  try {
    const {id} = req.params
    const history = await History.findById(id)
    res.status(200).json(history)
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const verifyIdExistsHistory = (id) => {
  const history = History.findOne({_id: id})
  return history
}

export const verifyNameExistsHistory = async(title) => {
  const history = title[0].toUpperCase() + title.slice(1)
  const verifyExist = await History.findOne({title: history})
  return verifyExist
}

export const updateHistory = async (req, res) => {
  try {
    const body = req.body
    const{id} = req.params
    const historyUpdated = await History.findByIdAndUpdate(id, body, {new: true})
    res.status(200).json({message: 'Historia actualizada con éxito', historyUpdated})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const deleteHistory = async (req, res) => {
  try {
    const {id} = req.params
    const history = await History.findById(id)
    history.deleted = true
    history.save()
    res.status(200).json({meesage: 'Historia eliminada con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const restoreHistory = async (req, res) => {
  try {
    const {id} = req.params
    const history = await History.findById(id)
    history.deleted = false
    history.save()
    res.status(200).json({meesage: 'Historia restaurada con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

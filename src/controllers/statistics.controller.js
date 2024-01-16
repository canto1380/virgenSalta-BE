import Statistics from "../models/statistics.model.js"

export const createStatistics = async(req, res) => {
  try {
    const body = req.body
    const newStatistics = new Statistics(body)
    const maxRegister = await Statistics.findOne({}).sort({'order': 'desc'})
    console.log(maxRegister)
    newStatistics.order  = maxRegister ? maxRegister.order + 1 : 1
    await newStatistics.save()
    res.status(200).json(newStatistics)
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}

export const allStatistics = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      search = "",
      order = "",
      sortBy = "",
      deleted,
    } = req.query;
    let orderSearch = order ? order : "asc";
    let sortBySearch = sortBy ? sortBy : "order";
    const regex = new RegExp(search, "i");
    let filters = {
      title: regex,
    };
    if(deleted) filters ={...filters, deleted}

    const countStatistics = await Statistics.countDocuments();
    const findTotal = await Statistics.find(filters)
    const allStatistics = await Statistics.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort([[sortBySearch, orderSearch]])
    const foundRegisters = allStatistics.length

    res.status(200).json({
      allStatistics,
      totalRegister: findTotal.length,
      foundRegisters,
      totalPages: Math.ceil( countStatistics/limit ),
      currentPage: page
    });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const statisticsById = async (req, res) => {
  try {
    const {id} = req.params
    const statistics = await Statistics.findById(id)
    res.status(200).json(statistics)
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const verifyIdExistsStatistics = (id) => {
  const statistics = Statistics.findOne({_id: id})
  return statistics
}

export const verifyNameExistsStatistics = async(title) => {
  const statistics = title[0].toUpperCase() + title.slice(1)
  const verifyExist = await Statistics.findOne({title: statistics})
  return verifyExist
}

export const updateStatistics = async (req, res) => {
  try {
    const body = req.body
    const{id} = req.params
    const statisticsUpdated = await Statistics.findByIdAndUpdate(id, body, {new: true})
    res.status(200).json({message: 'Estadística actualizada con éxito', statisticsUpdated})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const updateOrderNumber = async(req, res) => {
  try {
    const {id, order} = req.body
    const itemStatisticsUpdate = await Statistics.findById(id)
    itemStatisticsUpdate.order = order
    itemStatisticsUpdate.save()
    res.status(200).json({message: 'Orden actualizado con éxito'})
  } catch (error) {
    res.status(400).send({error: error.message, success: false})
  }
}

export const deleteStatistics = async (req, res) => {
  try {
    const {id} = req.params
    const statistics = await Statistics.findById(id)
    statistics.deleted = true
    statistics.save()
    res.status(200).json({meesage: 'Estadística eliminada con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const restoreStatistics = async (req, res) => {
  try {
    const {id} = req.params
    const statistics = await Statistics.findById(id)
    statistics.deleted = false
    statistics.save()
    res.status(200).json({meesage: 'Estadística restaurada con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

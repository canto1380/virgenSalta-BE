import Configurations from "../models/configurations.model.js"

export const createConfigurations = async(req, res) => {
  try {
    const body = req.body
    const newConfigurations = new Configurations(body)
    const maxRegister = await Configurations.findOne({}).sort({'order': 'desc'})
    console.log(maxRegister)
    newConfigurations.order  = maxRegister ? maxRegister.order + 1 : 1
    await newConfigurations.save()
    res.status(200).json(newConfigurations)
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}

export const allConfigurations = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10000,
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

    const countConfigurations = await Configurations.countDocuments();
    const findTotal = await Configurations.find(filters)
    const allConfigurations = await Configurations.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort([[sortBySearch, orderSearch]])
    const foundRegisters = allConfigurations.length

    res.status(200).json({
      allConfigurations,
      totalRegister: findTotal.length,
      foundRegisters,
      totalPages: Math.ceil( countConfigurations/limit ),
      currentPage: page
    });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const configurationsById = async (req, res) => {
  try {
    const {id} = req.params
    const configurations = await Configurations.findById(id)
    res.status(200).json(configurations)
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const verifyIdExistsConfigurations = (id) => {
  const configurations = Configurations.findOne({_id: id})
  return configurations
}

export const verifyNameExistsConfigurations = async(title) => {
  const configurations = title[0].toUpperCase() + title.slice(1)
  const verifyExist = await Configurations.findOne({title: configurations})
  return verifyExist
}

export const updateConfigurations = async (req, res) => {
  try {
    const body = req.body
    const{id} = req.params
    const configurationsUpdated = await Configurations.findByIdAndUpdate(id, body, {new: true})
    res.status(200).json({message: 'Configuración actualizada con éxito', configurationsUpdated})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const deleteConfigurations = async (req, res) => {
  try {
    const {id} = req.params
    const configurations = await Configurations.findById(id)
    configurations.deleted = true
    configurations.save()
    res.status(200).json({meesage: 'Configuración eliminada con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const restoreConfigurations = async (req, res) => {
  try {
    const {id} = req.params
    const configurations = await Configurations.findById(id)
    configurations.deleted = false
    configurations.save()
    res.status(200).json({meesage: 'Configuración restaurada con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

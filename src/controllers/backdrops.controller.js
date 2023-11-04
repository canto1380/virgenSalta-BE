
import Backdrops from "../models/backdrops.model.js"

export const createBackdrops = async(req, res) => {
  try {
    const body = req.body
    const newBackdrops = new Backdrops(body)
    await newBackdrops.save()
    res.status(200).json(newBackdrops)
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}

export const allBackdrops = async (req, res) => {
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
      nameBackdrop: regex,
    };
    if(deleted) filters ={...filters, deleted}
    const countBackdrops = await Backdrops.countDocuments();
    const findTotal = await Backdrops.find(filters)
    const allBackdrops = await Backdrops.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort([[sortBySearch, orderSearch]])
    const foundRegisters = allBackdrops.length

    res.status(200).json({
      allBackdrops,
      totalRegister: findTotal.length,
      foundRegisters,
      totalPages: Math.ceil( countBackdrops/limit ),
      currentPage: page
    });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const backdropById = async (req, res) => {
  try {
    const {id} = req.params
    const backdrop = await Backdrops.findById(id)
    res.status(200).json(backdrop)
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const verifyIdExistsBackdrops = (id) => {
  const backdrop = Backdrops.findOne({_id: id})
  return backdrop
}

export const verifyNameExistsBackdrops = async(nameBackdrop) => {
  const backdrop = nameBackdrop[0].toUpperCase() + nameBackdrop.slice(1)
  const verifyExist = await Backdrops.findOne({nameBackdrop: backdrop})
  return verifyExist
}

export const updateBackdrops = async (req, res) => {
  try {
    const body = req.body
    const{id} = req.params
    const backdropUpdated = await Backdrops.findByIdAndUpdate(id, body, {new: true})
    res.status(200).json({message: 'Portada actualizada con éxito', backdropUpdated})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const deleteBackdrops = async (req, res) => {
  try {
    const {id} = req.params
    const backdrop = await Backdrops.findById(id)
    backdrop.deleted = true
    backdrop.save()
    res.status(200).json({meesage: 'Portada eliminada con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const restoreBackdrops = async (req, res) => {
  try {
    const {id} = req.params
    const backdrop = await Backdrops.findById(id)
    backdrop.deleted = false
    backdrop.save()
    res.status(200).json({meesage: 'Portada restaurada con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

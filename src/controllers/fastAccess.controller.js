import FastAccess from "../models/fastAccess.model.js"

export const createFastAccess = async(req, res) => {
  try {
    const body = req.body
    const newFastAccess = new FastAccess(body)
    await newFastAccess.save()
    res.status(200).json(newFastAccess)
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}

export const allFastAccess = async (req, res) => {
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

    const countFastAccess = await FastAccess.countDocuments();
    const findTotal = await FastAccess.find(filters)
    const allFastAccess = await FastAccess.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort([[sortBySearch, orderSearch]])
    const foundRegisters = allFastAccess.length

    res.status(200).json({
      allFastAccess,
      totalRegister: findTotal.length,
      foundRegisters,
      totalPages: Math.ceil( countFastAccess/limit ),
      currentPage: page
    });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const fastAccessById = async (req, res) => {
  try {
    const {id} = req.params
    const fastAccess = await FastAccess.findById(id)
    res.status(200).json(fastAccess)
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const verifyIdExistsFastAccess = (id) => {
  const fastAccess = FastAccess.findOne({_id: id})
  return fastAccess
}

export const verifyNameExistsFastAccess = async(title) => {
  const fastAccess = title[0].toUpperCase() + title.slice(1)
  const verifyExist = await FastAccess.findOne({title: fastAccess})
  return verifyExist
}

export const updateFastAccess = async (req, res) => {
  try {
    const body = req.body
    const{id} = req.params
    const fastAccessUpdated = await FastAccess.findByIdAndUpdate(id, body, {new: true})
    res.status(200).json({message: 'Acceso actualizado con éxito', fastAccessUpdated})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const deleteFastAccess = async (req, res) => {
  try {
    const {id} = req.params
    const fastAccess = await FastAccess.findById(id)
    fastAccess.deleted = true
    fastAccess.save()
    res.status(200).json({meesage: 'Acceso eliminado con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const restoreFastAccess = async (req, res) => {
  try {
    const {id} = req.params
    const fastAcecss = await FastAccess.findById(id)
    fastAcecss.deleted = false
    fastAcecss.save()
    res.status(200).json({meesage: 'Acceso restaurado con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

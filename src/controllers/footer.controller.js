import DirectAccessFooter from "../models/footer.model.js"

export const createDirectAccessFooter = async(req, res) => {
  try {
    const body = req.body
    const newDirectAccessFooter = new DirectAccessFooter(body)
    const maxRegister = await DirectAccessFooter.findOne({}).sort({'order': 'desc'})
    newDirectAccessFooter.order  = maxRegister ? maxRegister.order + 1 : 1
    await newDirectAccessFooter.save()
    res.status(200).json(newDirectAccessFooter)
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}

export const allDirectAccessFooter = async (req, res) => {
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

    const countDirectAccessFooter = await DirectAccessFooter.countDocuments();
    const findTotal = await DirectAccessFooter.find(filters)
    const allDirectAccessFooter = await DirectAccessFooter.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort([[sortBySearch, orderSearch]])
    const foundRegisters = allDirectAccessFooter.length

    res.status(200).json({
      allDirectAccessFooter,
      totalRegister: findTotal.length,
      foundRegisters,
      totalPages: Math.ceil( countDirectAccessFooter/limit ),
      currentPage: page
    });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const directAccessFooterById = async (req, res) => {
  try {
    const {id} = req.params
    const directAccessFooter = await DirectAccessFooter.findById(id)
    res.status(200).json(directAccessFooter)
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const verifyIdExistsDirectAccessFooter = (id) => {
  const directAccessFooter = DirectAccessFooter.findOne({_id: id})
  return directAccessFooter
}

export const verifyNameExistsDirectAccessFooter = async(title) => {
  const directAccessFooter = title[0].toUpperCase() + title.slice(1)
  const verifyExist = await DirectAccessFooter.findOne({title: directAccessFooter})
  return verifyExist
}

export const updateDirectAccessFooter = async (req, res) => {
  try {
    const body = req.body
    const{id} = req.params
    const directAccessFooterUpdated = await DirectAccessFooter.findByIdAndUpdate(id, body, {new: true})
    res.status(200).json({message: 'Acceso directo actualizado con éxito', directAccessFooterUpdated})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const updateOrderNumber = async(req, res) => {
  try {
    const {id, order} = req.body
    const itemDirectAccessFooterUpdate = await DirectAccessFooter.findById(id)
    itemDirectAccessFooterUpdate.order = order
    itemDirectAccessFooterUpdate.save()
    res.status(200).json({message: 'Orden actualizado con éxito'})
  } catch (error) {
    res.status(400).send({error: error.message, success: false})
  }
}

export const deleteDirectAccessFooter = async (req, res) => {
  try {
    const {id} = req.params
    const directFooterAccess = await DirectAccessFooter.findById(id)
    directFooterAccess.deleted = true
    directFooterAccess.save()
    res.status(200).json({meesage: 'Acceso directo eliminado con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const restoreDirectFooterAccess = async (req, res) => {
  try {
    const {id} = req.params
    const directAccessFooter = await DirectAccessFooter.findById(id)
    directAccessFooter.deleted = false
    directAccessFooter.save()
    res.status(200).json({meesage: 'Acceso directo restaurado con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

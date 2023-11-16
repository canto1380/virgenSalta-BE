import ItemNav from "../models/itemNav.model.js"

export const createItemNav = async(req, res) => {
  try {
    const body = req.body
    const newItemNav = new ItemNav(body)
    await newItemNav.save()
    res.status(200).json(newItemNav)
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}

export const allItemNav = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      search = "",
      order = "",
      sortBy = "",
      idItemNavCategory,
      visible,
    } = req.query;
    let orderSearch = order ? order : "desc";
    let sortBySearch = sortBy ? sortBy : "createdAt";
    const regex = new RegExp(search, "i");
    let filters = {
      title: regex,
    };
    if(visible) filters ={...filters, visible}
    if(idItemNavCategory && idItemNavCategory !== '')
      filters = { ...filters, idItemNavCategory}
    const countItemNav = await ItemNav.countDocuments();
    const findTotal = await ItemNav.find(filters)
    const allItemNav = await ItemNav.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort([[sortBySearch, orderSearch]])
      .populate({path: 'idItemNavCategory'})
    const foundRegisters = allItemNav.length

    res.status(200).json({
      allItemNav,
      totalRegister: findTotal.length,
      foundRegisters,
      totalPages: Math.ceil( countItemNav/limit ),
      currentPage: page
    });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const itemNavById = async (req, res) => {
  try {
    const {id} = req.params
    const itemNav = await ItemNav.findById(id)
    .populate({path: 'idItemNavCategory'})
    res.status(200).json(itemNav)
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const verifyIdExistsItemNav = (id) => {
  const itemNav = ItemNav.findOne({_id: id})
  return itemNav
}

export const verifyNameExistsItemNav = async(title) => {
  const itemNav = title[0].toUpperCase() + title.slice(1)
  const verifyExist = await ItemNav.findOne({title: itemNav})
  return verifyExist
}

export const updateItemNav = async (req, res) => {
  try {
    const body = req.body
    const{id} = req.params
    const itemNavUpdated = await ItemNav.findByIdAndUpdate(id, body, {new: true})
    res.status(200).json({message: 'Seeción actualizada con éxito', itemNavUpdated})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const deleteItemNav = async (req, res) => {
  try {
    const {id} = req.params
    const itemNav = await ItemNav.findById(id)
    itemNav.visible = true
    itemNav.save()
    res.status(200).json({meesage: 'Sección eliminada con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const restoreItemNav = async (req, res) => {
  try {
    const {id} = req.params
    const itemNav = await ItemNav.findById(id)
    itemNav.visible = false
    itemNav.save()
    res.status(200).json({meesage: 'Sección restaurada con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

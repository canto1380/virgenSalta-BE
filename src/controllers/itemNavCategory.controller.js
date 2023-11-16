import ItemNav from "../models/itemNav.model.js"
import ItemNavCategory from "../models/itemNavCategory.model.js"

export const createItemNavCategory = async(req, res) => {
  try {
    const body = req.body
    const numberMax = await ItemNavCategory.find().sort({orderNumber: -1}).limit(1)
    const orderNumberNext = numberMax.length === 0 ? 1 : numberMax[0].orderNumber + 1
    const newItemNavCategory = new ItemNavCategory(body)
    newItemNavCategory.orderNumber = orderNumberNext
    await newItemNavCategory.save()
    res.status(200).json(newItemNavCategory)
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}

export const allItemNavCategory = async (req, res) => {
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
    let sortBySearch = sortBy ? sortBy : "orderNumber";
    const regex = new RegExp(search, "i");

    let filters = {
      itemNavCategory: regex,
    };
    if(deleted) filters ={...filters, deleted}
    const countItemNavCategory = await ItemNavCategory.countDocuments();
    const findTotal = await ItemNavCategory.find(filters)
    const allItemNavCategory = await ItemNavCategory.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort([[sortBySearch, orderSearch]])
    const foundRegisters = allItemNavCategory.length

    res.status(200).json({
      allItemNavCategory,
      totalRegister: findTotal.length,
      foundRegisters,
      totalPages: Math.ceil( countItemNavCategory/limit ),
      currentPage: page
    });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const itemNavCategoryById = async (req, res) => {
  try {
    const {id} = req.params
    const itemNavCategory = await ItemNavCategory.findById(id)
    res.status(200).json(itemNavCategory)
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const verifyIdExistsItemNavCategory = (id) => {
  const itemNavCategory = ItemNavCategory.findOne({_id: id})
  return itemNavCategory
}

export const verifyNameExistsItemNavCategory = async(itemNavCategory) => {
  const itemCategory = itemNavCategory[0].toUpperCase() + itemNavCategory.slice(1)
  const verifyExist = await ItemNavCategory.findOne({itemNavCategory: itemCategory})
  return verifyExist
}

export const updateItemNavCategory = async (req, res) => {
  try {
    const body = req.body
    const{id} = req.params
    const itemNavCategoryUpdated = await ItemNavCategory.findByIdAndUpdate(id, body, {new: true})
    res.status(200).json({message: 'Sección actualizada con éxito', itemNavCategoryUpdated})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};
export const updateOrderNumber = async(req, res) => {
  try {
    const {id, orderNumber} = req.body
    const itemNavCategoryUpdate = await ItemNavCategory.findById(id)
    itemNavCategoryUpdate.orderNumber = orderNumber
    itemNavCategoryUpdate.save()
    res.status(200).json({message: 'Orden actualizado con éxito'})
  } catch (error) {
    res.status(400).send({error: error.message, success: false})
  }
}

export const deleteItemNavCategory = async (req, res) => {
  try {
    const {id} = req.params
    const itemNavCategory = await ItemNavCategory.findById(id)
    itemNavCategory.visible = true
    itemNavCategory.save()
    res.status(200).json({meesage: 'Sección eliminada con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const restoreItemNavCategory = async (req, res) => {
  try {
    const {id} = req.params
    const itemNavCategory = await ItemNavCategory.findById(id)
    itemNavCategory.visible = false
    itemNavCategory.save()
    res.status(200).json({meesage: 'Sección restaurada con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

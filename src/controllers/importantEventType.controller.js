import ImportantEventType from "../models/importantEventType.model.js";

export const createImportantEventType = async(req, res) => {
  try {
    const body = req.body
    const newImportantEventType = new ImportantEventType(body)
    await newImportantEventType.save()
    res.status(200).json(newImportantEventType)
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}

export const allImportantEventType = async(req, res)=> {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      order = "",
      sortBy = "",
      deleted,
    } = req.query
    let orderSearch = order ? order : 'desc';
    let sortBySearch = sortBy ? sortBy : 'createdAt';
    const regex =  new RegExp(search, 'i')
    let filters = { name: regex }
    if(deleted) filters = {...filters, deleted}
    const countEventType = await ImportantEventType.countDocuments()
    const findTotal = await ImportantEventType.find(filters)
    const allEventType = await ImportantEventType.find(filters)
      .sort([[sortBySearch,orderSearch]])
      .skip((page - 1) * limit)
      .limit( limit * 1)
    const foundRegisters = allEventType.length
    res.status(200).json({
      allEventType,
      totalRegister: findTotal.length,
      foundRegisters,
      totalPages: Math.ceil( countEventType/limit ),
      currentPage: page
    })
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}
export const importantEventTypeById = async(req, res) => {
  try {
    const { id } = req.params
    const importantEvent = await ImportantEventType.findById(id)
    res.status(200).json(importantEvent)
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false })
  }
}
export const verifyIdExistsImportantEventType = (id) => {
  const importantEventType = ImportantEventType.findOne({ _id: id })
  return importantEventType
}
export const verifyNameExistsImportantEventType = async(importantEventTypeName) => {
  const importantEventType = importantEventTypeName[0].toUpperCase() + importantEventTypeName.slice(1)
  const verifyExists = await ImportantEventType.findOne({ name: importantEventType })
  return verifyExists
}
export const updateImportantEventType = async(req, res) => {
  try {
    const body = req.body
    const { id } = req.params
    const importantEventTypeUpdated =  await ImportantEventType.findByIdAndUpdate(id, body, {new: true})
    res.status(200).json({message: 'Tipo de evento importanto actualizado con exito', importantEventTypeUpdated})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false })
  }
}
export const deleteImportantEventType = async(req, res) => {
  try {
    const { id } = req.params
    const importantEventType = await ImportantEventType.findById(id)
    importantEventType.deleted = true
    importantEventType.save()
    res.status(200).json({message: 'Tipo de evento importante eliminado con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false })
  }
}
export const restoreImportantEventType = async(req, res) => {
  try {
    const { id } = req.params
    const importantEventType = await ImportantEventType.findById(id)
    importantEventType.deleted = false
    importantEventType.save()
    res.status(200).json({message: 'Tipo de evento importante restaurado con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false })
  }
}
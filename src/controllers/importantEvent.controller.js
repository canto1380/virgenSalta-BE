import ImportantEvent from "../models/importantEvent.model.js";

export const createImportantEvent = async(req, res) => {
  try {
    const body = req.body
    const newImportantEvent = new ImportantEvent(body)
    await newImportantEvent.save()
    res.status(200).json(newImportantEvent)
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}

export const allImportantEvent = async(req, res)=> {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      order = "",
      sortBy = "",
      deleted,
      idImportantEventType,
    } = req.query
    let orderSearch = order ? order : 'desc';
    let sortBySearch = sortBy ? sortBy : 'createdAt';
    const regex =  new RegExp(search, 'i')
    let filters = { eventName: regex }
    if(deleted) filters = {...filters, deleted}
    if(idImportantEventType && idImportantEventType !== '')
      filters = { ...filters, idImportantEventType}
    
    const [allEvent, totalCount] = await Promise.all([
      ImportantEvent.find(filters)
        .sort([[sortBySearch, orderSearch]])
        .skip((page - 1) * limit)
        .limit(limit * 1)
        .populate({ path: 'idImportantEventType', select: 'name' })
        .lean(),
      ImportantEvent.countDocuments(filters),
    ])
    const foundRegisters = allEvent.length
    res.status(200).json({
      allEvent,
      totalRegister: totalCount,
      foundRegisters,
      totalPages: Math.ceil(totalCount / limit),
      currentPage: page
    })
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}
export const importantEventById = async(req, res) => {
  try {
    const { id } = req.params
    const importantEvent = await ImportantEvent.findById(id)
      .populate({path: 'idImportantEventType'})
    res.status(200).json(importantEvent)
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false })
  }
}
export const verifyIdExistsImportantEvent = (id) => {
  const importantEvent = ImportantEvent.findOne({ _id: id })
  return importantEvent
}
export const verifyNameExistsImportantEvent = async(importantEventName) => {
  const importantEvent = importantEventName[0].toUpperCase() + importantEventName.slice(1)
  const verifyExists = await ImportantEvent.findOne({ eventName: importantEvent })
  return verifyExists
}
export const updateImportantEvent = async(req, res) => {
  try {
    const body = req.body
    const { id } = req.params
    const importantEventUpdated =  await ImportantEvent.findByIdAndUpdate(id, body, {new: true})
    res.status(200).json({message: 'Evento importante actualizado con exito', importantEventUpdated})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false })
  }
}
export const deleteImportantEvent = async(req, res) => {
  try {
    const { id } = req.params
    const importantEvent = await ImportantEvent.findById(id)
    importantEvent.deleted = true
    importantEvent.save()
    res.status(200).json({message: 'Evento importante eliminado con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false })
  }
}
export const restoreImportantEvent = async(req, res) => {
  try {
    const { id } = req.params
    const importantEvent = await ImportantEvent.findById(id)
    importantEvent.deleted = false
    importantEvent.save()
    res.status(200).json({message: 'Evento importante restaurado con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false })
  }
}
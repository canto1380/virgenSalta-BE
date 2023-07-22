import DailyEvent from "../models/dailyEvent.model.js"

export const createDailyEvent = async(req, res) => {
  try {
    const body = req.body
    const newDailyEvent = new DailyEvent(body)
    await newDailyEvent.save()
    res.status(200).json(newDailyEvent)
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}

export const allDailyEvent = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      order = "",
      sortBy = "",
      idEventType,
      day,
      deleted
    } = req.query;
    let orderSearch = order ? order : "desc";
    let sortBySearch = sortBy ? sortBy : "createdAt";
    const regex = new RegExp(search, "i");
    let filters = {
      text: regex,
    };
    if(deleted) filters ={...filters, deleted}
    if(idEventType && idEventType !== '')
      filters = { ...filters, idEventType}

    if(day && day !== '')
      filters = { ...filters, day}

    const counterDailyEvent = await DailyEvent.countDocuments();
    const allDailyEvent = await DailyEvent.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort([[sortBySearch, orderSearch]])
      .populate({path: 'idEventType'})
    const foundRegisters = allDailyEvent.length

    res.status(200).json({
      allDailyEvent,
      totalRegister: counterDailyEvent,
      foundRegisters,
      totalPages: Math.ceil( counterDailyEvent/limit ),
      currentPage: page
    });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const dailyEventById = async (req, res) => {
  try {
    const {id} = req.params
    const dailyEvent = await DailyEvent.findById(id)
    .populate({path: 'idEventType'})
    res.status(200).json(dailyEvent)
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const verifyIdDailyEvent = (id) => {
  const dailyEvent = DailyEvent.findOne({_id: id})
  return dailyEvent
}

export const updateDailyEvent = async (req, res) => {
  try {
    const body = req.body
    const{id} = req.params
    const dailyEventUpdated = await DailyEvent.findByIdAndUpdate(id, body, {new: true})
    res.status(200).json({message: 'Evento actualizado con éxito', dailyEventUpdated})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const deleteDailyEvent = async (req, res) => {
  try {
    const {id} = req.params
    const dailyEvent = await DailyEvent.findById(id)
    dailyEvent.deleted = true
    dailyEvent.save()
    res.status(200).json({meesage: 'Evento eliminado con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const restoreDailyEvent = async (req, res) => {
  try {
    const {id} = req.params
    const dailyEvent = await DailyEvent.findById(id)
    dailyEvent.deleted = false
    dailyEvent.save()
    res.status(200).json({meesage: 'Evento restaurado con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};



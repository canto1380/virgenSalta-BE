import EventType from "../models/eventType.model.js";

export const createEventType = async(req, res) => {
  try {
    const body = req.body
    const newEventType = new EventType(body)
    await newEventType.save()
    res.status(200).json(newEventType)
  } catch (error) {
    return res.status(400).send({error: error.message, succes: false})
  }
}

export const allEventType = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      order = "",
      sortBy = "",
      deleted = false,
    } = req.query;
    let orderSearch = order ? order : "desc";
    let sortBySearch = sortBy ? sortBy : "createdAt";
    const regex = new RegExp(search, "i");
    let filters = {
      deleted,
      eventName: regex,
    };
    const countEventType = await EventType.countDocuments();
    const allEvent = await EventType.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort([[sortBySearch, orderSearch]])
    const foundRegisters = allEvent.length

    res.status(200).json({
      allEvent,
      totalRegister: countEventType,
      foundRegisters,
      totalPages: Math.ceil( countEventType/limit ),
      currentPage: page
    });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const eventTypeById = async (req, res) => {
  try {
    const {id} = req.params
    const eventType = await EventType.findById(id)
    res.status(200).json(eventType)
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const verifyIdExistsEventType = (id) => {
  const eventType = EventType.findOne({_id: id})
  return eventType
}

export const verifyNameExistsEventType = async(eventName) => {
  const eventType = eventName[0].toUpperCase() + eventName.slice(1)
  const verifyExist = await EventType.findOne({eventName: eventType})
  return verifyExist
}

export const updateEventType = async (req, res) => {
  try {
    const body = req.body
    const{id} = req.params
    const eventTypeUpdated = await EventType.findByIdAndUpdate(id, body, {new: true})
    res.status(200).json({message: 'Tipo de evento actualizado con éxito', eventTypeUpdated})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const deleteEventType = async (req, res) => {
  try {
    const {id} = req.params
    const eventType = await EventType.findById(id)
    eventType.deleted = true
    eventType.save()
    res.status(200).json({meesage: 'Tipo de evento eliminado con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const restoreEventType = async (req, res) => {
  try {
    const {id} = req.params
    const eventType = await EventType.findById(id)
    eventType.deleted = false
    eventType.save()
    res.status(200).json({meesage: 'Tipo de evento restaurado con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

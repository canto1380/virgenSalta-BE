import MessageGeneral from "../models/messageGeneral.model.js";

export const createMessageGeneral = async(req, res) => {
  try {
    const body = req.body
    const newMessage = new MessageGeneral(body)
    await newMessage.save()
    res.status(200).json(newMessage)
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}

export const allMessageGeneral = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 12,
      search = "",
      order = "",
      sortBy = "",
      year,
      deleted,
    } = req.query;
    let orderSearch = order ? order : "asc";
    let sortBySearch = sortBy ? sortBy : "year";
    const regex = new RegExp(search, "i");
    let filters = {
      title: regex,
    };

    if(deleted) filters ={...filters, deleted}
    if(year && year !== 'Todos')
      filters = { ...filters, year}
    const countMessage = await MessageGeneral.countDocuments();
    const findTotal = await MessageGeneral.find(filters)
    const allMessage = await MessageGeneral.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort([[sortBySearch, orderSearch]])
    const foundRegisters = allMessage.length

    res.status(200).json({
      allMessage,
      totalRegister: findTotal.length,
      foundRegisters,
      totalPages: Math.ceil( countMessage/limit ),
      currentPage: page
    });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const messageGeneralById = async (req, res) => {
  try {
    const {id} = req.params
    const message = await MessageGeneral.findById(id)
    res.status(200).json(message)
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const verifyIdExistsMessage = (id) => {
  const message = MessageGeneral.findOne({_id: id})
  return message
}

export const updateMessageGeneral = async (req, res) => {
  try {
    const body = req.body
    const{id} = req.params
    const messageUpdated = await MessageGeneral.findByIdAndUpdate(id, body, {new: true})
    res.status(200).json({message: 'Mensaje actualizado con éxito', messageUpdated})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};


export const deleteMessageGeneral = async (req, res) => {
  try {
    const {id} = req.params
    const message = await MessageGeneral.findById(id)
    message.deleted = true
    message.save()
    res.status(200).json({meesage: 'Mensaje eliminado con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const restoreMessageGeneral = async (req, res) => {
  try {
    const {id} = req.params
    const message = await MessageGeneral.findById(id)
    message.deleted = false
    message.save()
    res.status(200).json({meesage: 'Mensaje restaurado con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};
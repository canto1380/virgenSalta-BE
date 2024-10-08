import MessageVirgen from "../models/messageVirgen.model.js";

export const createMessageVirgen = async(req, res) => {
  try {
    const body = req.body
    const newMessage = new MessageVirgen(body)
    await newMessage.save()
    res.status(200).json(newMessage)
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}

export const allMessageVirgen = async (req, res) => {
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
    console.log(year)
    if(year && year !== 'Todos')
      filters = { ...filters, year}
    const countMessage = await MessageVirgen.countDocuments();
    const findTotal = await MessageVirgen.find(filters)
    const allMessage = await MessageVirgen.find(filters)
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

export const messageVirgenById = async (req, res) => {
  try {
    const {id} = req.params
    const message = await MessageVirgen.findById(id)
    res.status(200).json(message)
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const verifyIdExistsMessage = (id) => {
  const message = MessageVirgen.findOne({_id: id})
  return message
}

export const updateMessageVirgen = async (req, res) => {
  try {
    const body = req.body
    const{id} = req.params
    const messageUpdated = await MessageVirgen.findByIdAndUpdate(id, body, {new: true})
    res.status(200).json({message: 'Mensaje actualizado con éxito', messageUpdated})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};


export const deleteMessageVirgen = async (req, res) => {
  try {
    const {id} = req.params
    const message = await MessageVirgen.findById(id)
    message.deleted = true
    message.save()
    res.status(200).json({meesage: 'Mensaje eliminado con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const restoreMessageVirgen = async (req, res) => {
  try {
    const {id} = req.params
    const message = await MessageVirgen.findById(id)
    message.deleted = false
    message.save()
    res.status(200).json({meesage: 'Mensaje restaurado con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};
import SpecialDays from "../models/specialDays.model.js"

export const createSpecialDays = async(req, res) => {
  try {
    const body = req.body
    console.log(body)
    const newSpecialDays = new SpecialDays(body)
    await newSpecialDays.save()
    res.status(200).json(newSpecialDays)
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}

export const allSpecialDays = async (req, res) => {
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
    const countSpecialDays = await SpecialDays.countDocuments();
    const findTotal = await SpecialDays.find(filters)
    const allSpecialDays = await SpecialDays.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort([[sortBySearch, orderSearch]])
    const foundRegisters = allSpecialDays.length

    res.status(200).json({
      allSpecialDays,
      totalRegister: findTotal.length,
      foundRegisters,
      totalPages: Math.ceil( countSpecialDays/limit ),
      currentPage: page
    });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const specialDaysById = async (req, res) => {
  try {
    const {id} = req.params
    const specialDays = await SpecialDays.findById(id)
    res.status(200).json(specialDays)
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const verifyIdExistsSpecialDays = (id) => {
  const specialDays = SpecialDays.findOne({_id: id})
  return specialDays
}

export const verifyNameExistsSpecialDays = async(title) => {
  const specialDays = title[0].toUpperCase() + title.slice(1)
  const verifyExist = await SpecialDays.findOne({title: specialDays})
  return verifyExist
}

export const updateSpecialDays = async (req, res) => {
  try {
    const body = req.body
    const{id} = req.params
    const specialDaysUpdated = await SpecialDays.findByIdAndUpdate(id, body, {new: true})
    res.status(200).json({message: 'Jornada actualizada con éxito', specialDaysUpdated})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const deleteSpecialDays = async (req, res) => {
  try {
    const {id} = req.params
    const specialDays = await SpecialDays.findById(id)
    specialDays.deleted = true
    specialDays.save()
    res.status(200).json({meesage: 'Jornada eliminada con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const restoreNSpecialDays= async (req, res) => {
  try {
    const {id} = req.params
    const specialDays = await SpecialDays.findById(id)
    specialDays.deleted = false
    specialDays.save()
    res.status(200).json({meesage: 'Jornada restaurada con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

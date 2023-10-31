import Carousel from "../models/carousel.model.js"

export const createCarousel = async(req, res) => {
  try {
    const body = req.body
    const newCarousel = new Carousel(body)
    await newCarousel.save()
    res.status(200).json(newCarousel)
  } catch (error) {
    return res.status(400).send({error: error.message, success: false})
  }
}

export const allCarousel = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      search = "",
      order = "",
      sortBy = "",
      deleted,
    } = req.query;
    let orderSearch = order ? order : "desc";
    let sortBySearch = sortBy ? sortBy : "createdAt";
    const regex = new RegExp(search, "i");

    let filters = {
      nameItem: regex,
    };
    if(deleted) filters ={...filters, deleted}
    const countCarousel = await Carousel.countDocuments();
    const findTotal = await Carousel.find(filters)
    const allCarousel = await Carousel.find(filters)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort([[sortBySearch, orderSearch]])
    const foundRegisters = allCarousel.length

    res.status(200).json({
      allCarousel,
      totalRegister: findTotal.length,
      foundRegisters,
      totalPages: Math.ceil( countCarousel/limit ),
      currentPage: page
    });
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const carouselById = async (req, res) => {
  try {
    const {id} = req.params
    const carousel = await Carousel.findById(id)
    res.status(200).json(carousel)
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const verifyIdExistsCarousel = (id) => {
  const carousel = Carousel.findOne({_id: id})
  return carousel
}

export const verifyNameExistsCarousel = async(nameItem) => {
  const category = nameItem[0].toUpperCase() + nameItem.slice(1)
  const verifyExist = await Carousel.findOne({nameItem: category})
  return verifyExist
}

export const updateCarousel = async (req, res) => {
  try {
    const body = req.body
    const{id} = req.params
    const carouselUpdated = await Carousel.findByIdAndUpdate(id, body, {new: true})
    res.status(200).json({message: 'Item de Carousel actualizado con éxito', carouselUpdated})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const deleteCarousel = async (req, res) => {
  try {
    const {id} = req.params
    const nameItem = await Carousel.findById(id)
    nameItem.deleted = true
    nameItem.save()
    res.status(200).json({meesage: 'Item de Carousel eliminado con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

export const restoreCarousel = async (req, res) => {
  try {
    const {id} = req.params
    const carousel = await Carousel.findById(id)
    carousel.deleted = false
    carousel.save()
    res.status(200).json({meesage: 'Item de Carousel restaurado con éxito'})
  } catch (error) {
    return res.status(400).send({ error: error.message, success: false });
  }
};

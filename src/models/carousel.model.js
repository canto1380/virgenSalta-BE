import mongoose, {Schema} from 'mongoose'

const carouselSchema = new Schema({
  nameItem: {
    type: String,
    trim: true,
    required: true,
    minlength: [5, 'Description must be greater than 5 char'],
    maxlength: [60, 'Description must be less than 60 char'],
  },
  deleted: {
    type: Boolean,
    default: false
  },
  file: {
    type: String,
    required: true
  }
}, {timestamps: true})

const Carousel = mongoose.model('Carousel', carouselSchema)
export default Carousel

import mongoose, {Schema} from 'mongoose'

const newsCategorySchema = new Schema({
  nameCategory: {
    type: String,
    trim: true,
    required: true,
    minlength: [10, 'Description must be greater than 10 char'],
    maxlength: [40, 'Description must be less than 100 char'],
  },
  deleted: {
    type: Boolean,
    default: false
  },
  backdrop: {
    type: String,
    required: true
  }
}, {timestamps: true})

const NewsCategory = mongoose.model('NewsCategory', newsCategorySchema)
export default NewsCategory

import mongoose, {Schema} from 'mongoose'

const newsCategorySchema = new Schema({
  nameCategory: {
    type: String,
    trim: true,
    required: true
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

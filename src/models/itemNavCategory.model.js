import mongoose, {Schema} from 'mongoose'

const itemNavCategorySchema = new Schema({
  itemNavCategory: {
    type: String,
    trim: true,
    required: true,
    minlength: [5, 'Description must be greater than 10 char'],
    maxlength: [40, 'Description must be less than 100 char'],
  },
  orderNumber: {
    type: Number,
    trim: true,
    required: true,
  },
  visible: {
    type: Boolean,
    default: true
  }
}, {timestamps: true})

const ItemNavCategory = mongoose.model('ItemNavCategory', itemNavCategorySchema)
export default ItemNavCategory

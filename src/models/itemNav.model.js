import mongoose, {Schema} from 'mongoose'
const itemNavSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    minlength: [5, 'Description must be greater than 10 char'],
    maxlength: [50, 'Description must be less than 100 char'],
    unique: true
  },
  url: {
    type: String,
    required: true,
    trim: true,
  },
  pathUrl: {
    type: String,
    required: true,
    trim: true
  },
  openWindows: {
    type: Boolean,
    default: false
  },
  idItemNavCategory: {
    type: Schema.Types.ObjectId,
    ref: 'ItemNavCategory',
    required: true,
    trim: true
  },
  visible: {
    type: Boolean,
    default: true
  }
}, {timestamps: true})

const ItemNav = mongoose.model('ItemNav', itemNavSchema)
export default ItemNav

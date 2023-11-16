import mongoose, {Schema} from 'mongoose'
const historySchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    minlength: [5, 'Description must be greater than 5 char'],
    maxlength: [150, 'Description must be less than 150 char'],
    unique: true
  },
  caption: {
    type: String,
    trim: true,
    minlength: [5, 'Description must be greater than 5 char'],
    maxlength: [100, 'Description must be less than 100 char'],
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: [10, 'Description must be greater than 10 char']
  },
  photos: {
    type: [String],
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {timestamps: true})

const History = mongoose.model('History', historySchema)
export default History

import mongoose, {Schema} from 'mongoose'
const StatisticsSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    minlength: [1, 'Description must be greater than 10 char'],
    maxlength: [20, 'Description must be less than 100 char'],
    unique: true
  },
  description: {
    type: String,
    minlength: [5, 'Description must be greater than 10 char'],
    maxlength: [50, 'Description must be less than 100 char'],
    required: true,
    trim: true
  },
  order: {
    type: Number,
    required: true,
  },
  deleted: {
    type: Boolean,
    default: false
  },
  visible: {
    type: Boolean,
    default: false
  }
}, {timestamps: true})

const Statistics = mongoose.model('statistics', StatisticsSchema)
export default Statistics

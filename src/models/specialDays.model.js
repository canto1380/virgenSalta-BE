import mongoose, {Schema} from 'mongoose'

const specialDaysSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    minlength: [5, 'Description must be greater than 10 char'],
    maxlength: [60, 'Description must be less than 100 char'],
  },
  subtitle: {
    type: String,
    required: true,
    trim: true,
    minlength: [5, 'Description must be greater than 10 char'],
    maxlength: [150, 'Description must be less than 100 char'],
  },
  photos: {
    type: [String],
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: [1, 'Description must be greater than 11 char']
  },
  deleted: {
    type: Boolean,
    default: false
  },
}, {timestamps: true})

const SpecialDays = mongoose.model('SpecialDays', specialDaysSchema)
export default SpecialDays

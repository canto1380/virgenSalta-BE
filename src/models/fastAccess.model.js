import mongoose, {Schema} from 'mongoose'
const fastAccessSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    minlength: [5, 'Description must be greater than 10 char'],
    maxlength: [20, 'Description must be less than 100 char'],
    unique: true
  },
  pathUrl: {
    type: String,
    required: true,
    trim: true
  },
  url: {
    type: String,
    trim: true,
  },
  openWindows: {
    type: Boolean,
    default: false
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {timestamps: true})

const FastAccess = mongoose.model('FastAccess', fastAccessSchema)
export default FastAccess

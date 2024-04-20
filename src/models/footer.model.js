import mongoose, {Schema} from 'mongoose'

const directAccessFooterSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    minlength: [3, 'Description must be greater than 10 char'],
    maxlength: [40, 'Description must be less than 100 char'],
  },
  urlRedirect: {
    type: String,
  },
  order: {
    type: Number,
    trim: true,
    required: true,
  },
  typeField: {
    type: String,
    enum: ['SecciónInterna', 'urlExterno'],
    required: true
  },
  deleted: {
    type: Boolean,
    default: false
  },
  newWindows: {
    type: Boolean,
    default: false
  }
}, {timestamps: true})

const DirectAccessFooter = mongoose.model('DirectAccessFooter', directAccessFooterSchema)
export default DirectAccessFooter

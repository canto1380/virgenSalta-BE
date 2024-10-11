import mongoose, {Schema} from 'mongoose'

const messageJesusSchema = new Schema({
  year: {
    type: Number,
    trim: true,
    required: true,
  },
  message: {
    type: String,
    required: true,
    trim: true,
    minlength: [1, 'Message must be greater than 1 char']
  },
  title: {
    type: String,
  },

  deleted: {
    type: Boolean,
    default: false
  },
}, {timestamps: true})

const MessageJesus = mongoose.model('MessageJesus', messageJesusSchema)
export default MessageJesus

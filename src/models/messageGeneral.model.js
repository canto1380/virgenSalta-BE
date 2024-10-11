import mongoose, {Schema} from 'mongoose'

const messageGeneralSchema = new Schema({
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

const MessageGeneral = mongoose.model('MessageGeneral', messageGeneralSchema)
export default MessageGeneral

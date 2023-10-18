import mongoose, {Schema} from 'mongoose'

const importantEventType = new Schema({
  name: {
    type:String,
    required: true,
    trim: true,
    unique: true
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {timestamps: true})

const ImportantEventType = mongoose.model('ImportantEventType', importantEventType)
export default ImportantEventType
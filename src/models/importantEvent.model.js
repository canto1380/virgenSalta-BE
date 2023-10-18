import mongoose, {Schema} from 'mongoose'

const importantEventSchema = new Schema({
  eventName: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  time: {
    type: String,
    required: true,
    trim: true,
  },
  idImportantEventType: {
    type: Schema.Types.ObjectId,
    ref: 'ImportantEventType',
    required: true,
    trim: true
  },
  deleted: {
    type: Boolean,
    default: false
  }
})
const ImportantEvent = mongoose.model('ImportantEvent', importantEventSchema)
export default ImportantEvent

import mongoose, {Schema} from 'mongoose'

const dailyEventSchema = new Schema({
  day: {
    type: String,
    required: true,
    trim: true,
  },
  time: {
    type: String,
    required: true,
    trim: true,
  },
  text: {
    type: String,
    required: true,
    trim: true,
  },
  additionalText: {
    type: String,
    trim: true,
  },
  idEventType: {
    type: Schema.Types.ObjectId,
    ref: 'EventType',
    required: true,
    trim: true
  },
  deleted: {
    type: Boolean,
    default: false
  }
})
const DailyEvent = mongoose.model('DailyEvent', dailyEventSchema)
export default DailyEvent

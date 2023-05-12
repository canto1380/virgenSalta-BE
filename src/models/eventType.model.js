import mongoose, {Schema} from 'mongoose'

const eventTypeSchema = new Schema({
  eventName: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {timestamps: true})

const EventType = mongoose.model('EventType', eventTypeSchema)
export default EventType

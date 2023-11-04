import mongoose, {Schema} from 'mongoose'

const backdropSchema = new Schema({
  nameBackdrop: {
    type: String, 
    trim: true,
    required: true
  },
  backdrop:{
    type: String,
    required: true
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {timestamps: true})

const Backdrops = mongoose.model('Backdrop', backdropSchema)
export default Backdrops
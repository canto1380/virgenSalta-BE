import mongoose, {Schema} from 'mongoose'
const newsSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  subtitle: {
    type: String,
    required: true,
    trim: true
  },
  caption: {
    type: String,
    trim: true,
    required: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  photos: {
    type: [String],
    // required: true
  },
  idNewsCategory: {
    type: Schema.Types.ObjectId,
    ref: 'NewsCategory',
    required: true,
    trim: true
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {timestamps: true})

const News = mongoose.model('News', newsSchema)
export default News

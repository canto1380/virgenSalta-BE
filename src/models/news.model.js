import mongoose, {Schema} from 'mongoose'
const newsSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    minlength: [5, 'Description must be greater than 10 char'],
    maxlength: [150, 'Description must be less than 100 char'],
    unique: true
  },
  subtitle: {
    type: String,
    required: true,
    trim: true,
    minlength: [5, 'Description must be greater than 10 char'],
    maxlength: [150, 'Description must be less than 100 char'],
  },
  caption: {
    type: String,
    trim: true,
    required: true,
    minlength: [5, 'Description must be greater than 10 char'],
    maxlength: [100, 'Description must be less than 100 char'],
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: [150, 'Description must be greater than 10 char']
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

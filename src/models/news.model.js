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
    trim: true,
    minlength: [5, 'Description must be greater than 10 char'],
    maxlength: [150, 'Description must be less than 100 char'],
  },
  caption: {
    type: String,
    trim: true,
    maxlength: [100, 'Description must be less than 100 char'],
  },
  description: {
    type: String,
    required: true,
    trim: true,
    minlength: [1, 'Description must be greater than 1 char']
  },
  photos: {
    type: [String],
  },
  idNewsCategory: {
    type: Schema.Types.ObjectId,
    ref: 'NewsCategory',
    required: true,
    trim: true
  },
  visible: {
    type: Boolean,
    default: true
  },
  home: {
    type: Boolean,
    default: false
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {timestamps: true})

const News = mongoose.model('News', newsSchema)
export default News

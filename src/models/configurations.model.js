import mongoose, {Schema} from 'mongoose'

const configurationsSchema = new Schema({
  title: {
    type: String,
    trim: true,
    required: true,
    minlength: [3, 'Description must be greater than 10 char'],
    maxlength: [40, 'Description must be less than 100 char'],
  },
  mixedField: {
    type: mongoose.Schema.Types.Mixed,
  },
  typeField: {
    type: String,
    enum: ['imagen', 'video', 'url', 'texto'],
    required: true
  },

  deleted: {
    type: Boolean,
    default: false
  },

}, {timestamps: true})

const Configurations = mongoose.model('Configurations', configurationsSchema)
export default Configurations

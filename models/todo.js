const mongoose = require('mongoose');
const schema = mongoose.Schema;

const todoSchema = new schema({
  name: {
    type: String,
    required: true
  },
  done: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Todo', todoSchema);
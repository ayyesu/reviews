const mongoose = require('mongoose')

const reachoutSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    minLength: 4,
    maxLength: 200
  },
  email: {
     type: String,
    required: true,
    unique: true,
    minLength: 9,
    maxLength: 100
  },
  message: {
    type: String,
    required: true,
    minLength: 10,
    maxLength: 50000
  },
  uid: String
}, { timestamp: true })

const Reachout = mongoose.model("User_message", reachoutSchema)

exports.Reachout = Reachout
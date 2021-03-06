const mongoose = require('mongoose')
const Schema = mongoose.Schema

const IssueSchema = new Schema({
  message: { type: String, required: true },
  source: { type: String, required: true },
  lineno: { type: Number, required: true },
  colno: { type: Number, required: true },
  agent: { type: Object, required: true},
  stack: { type: String, required: false },
  version: { type: String, required: true },
  created_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('issue', IssueSchema)

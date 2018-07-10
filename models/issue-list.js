const mongoose = require('mongoose')
const Schema = mongoose.Schema
const IssueSchema = require('./issue')

const IssueListSchema = new Schema({
  message: { type: String, required: true },
  source: { type: String, required: true },
  lineno: { type: Number, required: true },
  colno: { type: Number, required: true },
  list: [ IssueSchema.schema ],
  created_at: { type: Date, default: Date.now }
})

module.exports = mongoose.model('IssueList', IssueListSchema)

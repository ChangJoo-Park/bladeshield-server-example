const express = require('express')
const userAgent = require('express-useragent')
const router = express.Router()
const Issue = require('../models/issue')
const IssueList = require('../models/issue-list')

router.get('/', function (req, res) {
  Issue.find(function (err, issues) {
    if (err) return res.status(500).send({
      error: 'database failure'
    })
    res.json(issues)
  })
})

router.post('/', async function (req, res) {
  const {
    message,
    source,
    lineno,
    colno,
    stack,
    version: sdkVersion
  } = req.body

  const userAgentSource = req.headers['user-agent']
  const {
    browser,
    version,
    os,
    platform,
    source: uaSource
  } = userAgent.parse(userAgentSource)

  const agent = {
    browser,
    version,
    os,
    platform,
    source: uaSource
  }
  console.clear()
  console.log('version => ', sdkVersion)
  console.log('agent => ', agent)

  const existsIssueList = await IssueList.findOne({
    'message': message,
    'source': source,
    'lineno': lineno,
    'colno': colno
  })
  let savedNewIssueList = null
  const issue = new Issue({
    message,
    source,
    lineno,
    colno,
    stack,
    agent,
    version: sdkVersion
  })
  await issue.save()
  let returnIssueList = existsIssueList
  if (existsIssueList === null) {
    const newIssueList = new IssueList({
      message,
      source,
      lineno,
      colno
    })
    returnIssueList = await newIssueList.save()
  }

  await IssueList.update({
    _id: returnIssueList._id
  }, {
    $push: {
      list: issue
    }
  })

  res.json(returnIssueList)

  const axios = require('axios')
  const text =
    `
  ${returnIssueList.source} 의 *${returnIssueList.lineno}* 번 행 / *${returnIssueList.colno}* 번 열에 에러가 있습니다.
  발생시각 : *${returnIssueList.created_at}*
  메시지 : *${returnIssueList.message}*
  발생횟수: *${returnIssueList.list.length}* 번 ㅠ_ㅠ
  `
  const payload = {
    channel: "#report",
    username: "반갑습니다",
    text: text,
    icon_emoji: ":man-raising-hand::skin-tone-2:"
  }
  axios({
    method: 'POST',
    url: '<SLACK API HOOK>',
    data: payload
  })
})

module.exports = router

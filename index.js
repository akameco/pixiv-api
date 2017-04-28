'use strict'
const { stringify } = require('querystring')
const { send, json } = require('micro')
const cors = require('micro-cors')()
const axios = require('axios')

const instance = axios.create({
  baseURL: 'https://app-api.pixiv.net/',
  headers: {
    'App-OS': 'ios',
    'App-OS-Version': '9.3.3',
    'App-Version': '6.0.9',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})

module.exports = cors(async (req, res) => {
  let opts = {
    method: req.method,
    headers: {
      authorization: req.headers.authorization,
    },
  }

  if (req.method.toLowerCase() === 'post') {
    const js = await json(req)
    opts = Object.assign(opts, {
      method: req.method,
      data: stringify(js),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        authorization: req.headers.authorization,
      },
    })
  }
  const { data } = await instance(req.url, opts)
  return data
})

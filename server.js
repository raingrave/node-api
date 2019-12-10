const express = require('express')

const bodyParser = require('body-parser')

const routes = require('./src/routes/index.js')

require('./src/database')

const app = express()

app.use(bodyParser.json())

app.use(routes)

app.listen(9090, function () {
  console.log('start on port 9090!');
});
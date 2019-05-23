let express = require('express')
let bodyParser = require('body-parser')
let router = require('./router')

let app = express()

app.use(bodyParser.urlencoded({
  extended: false
}))
app.use(bodyParser.json())


app.use(router)

app.listen(3500, (err) => {
  if (err)
    throw err;
  console.log('running in 3500');
})

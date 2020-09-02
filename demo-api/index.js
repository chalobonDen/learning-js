const express = require('express') // โหลด module express
const moment = require('moment')
const app = express() // สร้าง Instance express

const route_api = require('./api')
app.use((req, res, next) => {
  console.log(`LOGGED:${moment().format('MMMM Do YYYY,h:mm:ss a')}`)
  next()
})
app.use('/api', route_api)
app.get('/', (req, res) => {
  res.send('Home')
})
app.get('/about', (req, res) => {
  res.send('<h1>About</h1>')
})

// app.get('/student', (req, res) => {
//   console.log(req.query)
//   res.send('<h1>Student</h1> ' + req.query.code)
// })

app.get('/student/:code?', (req, res) => {
  console.log(req.query)
  console.log(req.params)
  res.send('<h1>Student</h1> ' + req.params.code)
})

app.listen(5000, () => console.log('Example app listening on port 5000!')) // Start Server ที่ localhost Port 5000

const express = require('express')
const app = express()
const port = 80

app.get('/', (req, res) => {
  res.sendFile('/rubecube.html' , { root : __dirname});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
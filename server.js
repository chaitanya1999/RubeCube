const express = require('express')
const app = express()
const port = process.env.PORT || 80

app.get('/', (req, res) => {
  res.sendFile('/rubecube.html' , { root : __dirname});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
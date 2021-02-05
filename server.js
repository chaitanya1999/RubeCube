const express = require('express')
const app = express()
const port = process.env.PORT || 80

app.get('/', (req, res) => {
  res.sendFile('/rubecube.html' , { root : __dirname});
})
app.get('/gradient',(req,res)=>{
  res.sendFile('/gradient.png' , { root : __dirname});
})
app.get('/sound.wav',(req,res)=>{
  res.sendFile('/sound.mp3' , { root : __dirname});
})
app.get('/file/:file',(req,res)=>{
  res.sendFile('/'+req.params.file , { root : __dirname});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
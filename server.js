const express = require('express')
const app = express()
const port = process.env.PORT || 80

app.get('/', (req, res) => {
  res.sendFile('/index.html' , { root : __dirname});
})
app.get('/res/gradient.png',(req,res)=>{
  res.sendFile('/res/gradient.png' , { root : __dirname});
})
app.get('/sound.mp3',(req,res)=>{
  res.sendFile('/sound.mp3' , { root : __dirname});
})
app.get('/res/:file',(req,res)=>{
  res.sendFile('/res/'+req.params.file , { root : __dirname});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
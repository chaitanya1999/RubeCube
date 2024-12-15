const express = require('express')
const app = express()
const port = process.env.PORT || 80

app.get('/', (req, res) => {
  res.sendFile('/index.html' , { root : __dirname});
})
app.get('/RubeCube/gradient.png',(req,res)=>{
  res.sendFile('/RubeCube/gradient.png' , { root : __dirname});
})
app.get('/sound.mp3',(req,res)=>{
  res.sendFile('/RubeCube/sound.mp3' , { root : __dirname});
})
app.get('/RubeCube/:file',(req,res)=>{
  res.sendFile('/RubeCube/'+req.params.file , { root : __dirname});
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
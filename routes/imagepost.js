const express = require("express")
const multer = require("multer")

const router = express.Router()
const app = express()

app.get('/uploads', (req, res) => {
    res.sendFile(__dirname + '/imagepost.html')
})

//Setting destination and filename for uploaded files
const storage = multer.diskStorage({
    destination: function(req, file, callback) {
      callback(null, './uploads')
    },
    filename: function(req, file, callback) {
      callback(null, file.originalname)
    }
})

const upload = multer({ storage }).single('myfile')

app.post('/uploads', (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.end("Error uploading file!!")
    console.log("File Uploaded successfully")
    res.end()
    res.redirect('/uploads')
  })
})

module.exports = router
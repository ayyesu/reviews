const express = require("express")
const multer = require("multer")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const Joi = require("joi")
const { Reachout } = require('./models/reachout')

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('js'));


mongoose.set('strictQuery', true);
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

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/uploads', (req, res) => {
  res.sendFile(__dirname + '/imagepost.html')
})

app.get('/users', (req, res) => {
  res.sendFile(__dirname + "/users.html")
})

app.post('/postResponse', async (req, res) => {
  const schema = Joi.object({
    fullname: Joi.string().min(4).max(200).required(),
    email: Joi.string().email().min(9).max(100).required(),
    message: Joi.string().min(10).max(50000).required(),
    uid: Joi.string()
  })
  const { error } = schema.validate(req.body)
  if (error) return res.status(400).send(error.details[0].message)

  const { fullname, email, message, uid } = req.body;
  const reachout = new Reachout({
    fullname,
    email,
    message,
    uid
  })
  try {
    const reachoutSuccess = await reachout.save()
    res.send(reachoutSuccess)
  } catch (error) {
    res.status(500).send(error.message)
    console.error(error)
  }
  //response = {
  //firstName: req.body.first_name,
  //lastName: req.body.last_name,
  //message: req.body.message
  //}
  //console.log(response)
  //res.end(JSON.stringify(response))
})

app.get('/messages', async (req, res) => {
  try {
    const messages = await Reachout.find().sort({ date: -1 })
    res.send(messages)
  } catch (error) {
    res.status(500).send(error.message)
    console.error(error.message)
  }
})

app.get('/messages/:id', async (req, res) => {
  try {
    const message = await Reachout.findById(req.params.id)
    res.send(message)
  } catch (error) {
    res.status(500).send(error.message)
    console.error(error.message)
  }
})

app.post('/uploads', (req, res) => {
  upload(req, res, (err) => {
    if (err) return res.end("Error uploading file!!")
    console.log("File Uploaded successfully")
    res.end()
    res.redirect('/uploads')
  })
})

app.delete('/users/:id', async (req, res) => {
  try {
    const id = req.params.id
    await Reachout.findByIdAndDelete(id)
    res.json({ redirect: '/users'})
  } catch (error) {
    res.send("Error deleting user")
    console.error(error)
  }
})

const connection_string = "mongodb+srv://ayyesu:wasbornin2002@cluster0.gmnbus2.mongodb.net/test?retryWrites=true&w=majority"
mongoose.connect(connection_string, {
  useUnifiedTopology: true,
})
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Example App running on port ${port}`)
    })
    console.log('Connected to Mongodb')
  })
  .catch((err) => {
    console.error(err)
  })


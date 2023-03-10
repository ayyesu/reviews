const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const cors = require("cors")
const imagePost = require("./routes/imagepost")
const messages = require("./routes/messages")
const messagePost = require("./routes/message_post")

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(express.static('public'));
dotenv.config({ path: './.env'})

app.use("/imagepost", imagePost)
app.use("/messages", messages)
app.use("/users", messagePost)

mongoose.set('strictQuery', true);


app.get('/', (req, res) => {
  res.sendFile('/index.html')
})

app.get('/users', (req, res) => {
  res.sendFile(`${__dirname}/public/users.html`)
})

const connection_string = process.env.MONGODB_URL

mongoose.connect(connection_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server running on port ${port}`)
    })
    console.log('Connected to Mongodb')
  })
  .catch((err) => {
    console.error(err)
  })


const express = require("express")
const { Reachout } = require('../models/reachout')

const router = express.Router()

router.get('/messages', async (req, res) => {
    try {
      const messages = await Reachout.find().sort({ date: -1 })
      res.send(messages)
    } catch (error) {
      res.status(500).send(error.message)
      console.error(error.message)
    }
  })
  
  router.get('/messages/:id', async (req, res) => {
    try {
      const message = await Reachout.findById(req.params.id)
      res.send(message)
    } catch (error) {
      res.status(500).send(error.message)
      console.error(error.message)
    }
  })

  router.delete('/users/:id', async (req, res) => {
    try {
      const id = req.params.id
      await Reachout.findByIdAndDelete(id)
      res.json({ redirect: '/users'})
    } catch (error) {
      res.send("Error deleting user")
      console.error(error)
    }
  })


module.exports = router
const express = require("express")
const { Reachout } = require('../models/reachout')
const Joi = require("joi")

const router = express.Router()

router.post('/postResponse', async (req, res) => {
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
  
module.exports = router
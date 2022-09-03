const express = require('express')

const router = express.Router()

router.get('/remote', async (req, res, next) => {
    try {
    //   const questions = await Question.find()
    //   res.json(questions)
    } catch (e) {
      next(new Error('an error occured while uploading an url'))
    }
  })

  router.get('/local', async (req, res, next) => {
    try {
    //   const questions = await Question.find()
    //   res.json(questions)
    } catch (e) {
      next(new Error('an error occured while uploading locally'))
    }
  })

module.exports = router
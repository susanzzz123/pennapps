const express = require('express')
const router = express.Router()

const api_key = '2b108jwkqQofJmQ1nbXABTe'

// service: https://my-api.plantnet.org/v2/identify/all
// api-key: api-key=2b108jwkqQofJmQ1nbXABTe
// image_1: images=https%3A%2F%2Fmy.plantnet.org%2Fimages%2Fimage_1.jpeg
// image_2: images=https%3A%2F%2Fmy.plantnet.org%2Fimages%2Fimage_2.jpeg
// organ_1: organs=flower
// organ_2: organs=leaf

router.get('/remote', async (req, res, next) => {
    const { image } = req.body
    try {
      
    } catch (e) {
      next(new Error('an error occured while uploading an url'))
    }
  })

  router.post('/v2/identify/{project}', async (req, res, next) => {
    const { image, organs } = req.body
    try {
      const search_data = await Question.find()
      res.json(search_data)
    } catch (e) {
      next(e.message)
    }
  })

module.exports = router
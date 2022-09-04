// const upload = require('./router/upload')
const express = require('express')
const path = require('path')
const app = express()
const axios = require('axios')
const fs = require('fs')
const FormData = require('form-data');
const cors = require('cors')
const {wikiSentiment} = require('./wiki')

app.use(express.json())
app.use(express.static('dist'))

app.use(cors())

// app.use('/upload', upload)
app.use((err, req, res, next) => {
  res.status(500).send(`Something broke! Reason: ${err.message}`)
})

app.post('/local/identifyFlower/:image', async (req, res) => {
  const { params } = req

  // image must be a string path
  const { image } = params

  let form = new FormData();

  form.append('organs', 'leaf');
  form.append('images', fs.createReadStream(image));

  axios.post('https://my-api.plantnet.org/v2/identify/all?api-key=2b108jwkqQofJmQ1nbXABTe', form, {
    headers: form.getHeaders()
  }).then(response => {
    console.log(response.data)
    res.send(response.data)
  }).catch(err => {
    console.log(err)
    res.send(err)
  })
})

app.post('/remote/identifyPlant/:image/:organ', async (req, res) => {
  const { params } = req

  // image can be a regular url
  let { image, organ } = params

  image = encodeURIComponent(image)

  axios.get(`https://my-api.plantnet.org/v2/identify/all?api-key=2b108jwkqQofJmQ1nbXABTe&images=${image}&organs=${organ}&include-related-images=true&no-reject=false&lang=en`
  ).then((response) => {
    res.send(response.data)
  }).catch(err => {
    res.send(err)
  })
})

// set the initial entry point
app.get('/wiki', async (req, res) => {
  try {
    const { sentiment, rawText } = await wikiSentiment(req.query.name);
    console.log(sentiment);
    return res.json({ sentiment, rawText });
  } catch (e) {
    console.error(e);
  }
})

// set favicon
app.get('/favicon.ico', (req, res) => {
  res.status(404).send()
})

// set the initial entry point
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'))
})

app.listen(3001, () => {
  // eslint-disable-next-line no-console
  console.log('listening on 3001')
})
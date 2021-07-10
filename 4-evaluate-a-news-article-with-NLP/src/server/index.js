var path = require('path')
const cors = require('cors')
const express = require('express')
const fetch = require('node-fetch')
const mockAPIResponse = require('./mockAPI.js')
const port = process.env.port || 3000
const cloudUrl = 'https://api.meaningcloud.com/sentiment-2.1'
const dotenv = require('dotenv')
dotenv.config()

//Envirenment API key
console.log(`Your API key is ${process.env.API_KEY}`)

//Express
const app = express()
app.use(cors())

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(express.static('dist'))

app.get('/', function(req, res) {
    res.sendFile(path.resolve('dist/index.html'))

})

// designates what port the app will listen to for incoming requests
app.listen(port, function() {
    console.log(`App listening on http://localhost:${port}/`)
})

app.get('/test', function(req, res) {
    res.send(mockAPIResponse)
})

app.post('/evaluateArticle', async(req, res) => {
    try {
        const data = await req.body

        UrlfAPI = cloudUrl+'?key='+process.env.API_KEY+'+&url='+data.url+'&lang=en'; //Full url for api
            console.log(UrlfAPI)
        fetch(UrlfAPI)
            .then((res) => res.json())
            .then((json) => {
                const responseInfo = {
                    text: json['sentence_list'][0]['text'],
                    model: json['model'],
                    score_tag: json['score_tag'],
                    agreement: json['agreement'],
                    subjectivity: json['subjectivity'],
                    confidence: json['confidence'],
                    irony: json['irony'],
                }
                res.send(responseInfo);
                console.log('Succes')
            })
            .catch((error) => console.log('error', error))
    } catch (error) {
        console.log('error', error)
            // appropriately handle the error
    }
})
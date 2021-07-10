var path = require('path')
const cors = require('cors')
const express = require('express')
const fetch = require('node-fetch')
const mockAPIResponse = require('./mockAPI.js')
const port = process.env.port || 3000
const dotenv = require('dotenv')
const { resolve } = require('path')
const { rejects } = require('assert')
dotenv.config()

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

app.post('/getAllData', async(req, res) => {
    try {
        var responseData=[];
        const data = await req.body;
        cityCoords = `http://api.geonames.org/searchJSON?q=${data.data[0]}&username=${process.env.Username_GN}`; //Full url for api
        await fetch(cityCoords)
            .then((res) => res.json())
            .then((json) => {
                var coords = {lng: json.geonames[0].lng, lat: json.geonames[0].lat}
                fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${coords.lat}&lon=${coords.lng}&key=baf8ab97d44a4692bcce61fb4c5a3738`)
                    .then(res => res.json())
                    .then(json =>{
                        for (var day of json.data) {
                            if(day.datetime == data.data[1]){
 
                                weatherInfo = {
                                    temp: day.temp, max_min: [day.max_temp,day.min_temp]
                                }
                                
                            }
                         }
                        fetch(`https://pixabay.com/api/?key=${process.env.API_KEY_PBay}&q=${data.data[0].replace(' ','+')}&image_type=photo`)
                            .then(res => res.json())
                            .then(json =>{
                            imageUrls = [json.hits[14].webformatURL,json.hits[19].webformatURL,json.hits[5].webformatURL,json.hits[9].webformatURL]
                            const prom = new Promise(function(resolve,reject){
                                responseData.push(imageUrls)
                                responseData.push(weatherInfo)
                                console.log(responseData)
                                resolve()
                            })
                            prom.then((fullfilled)=>{
                                console.log('Promise boshlandi:')
                                console.log(responseData)
                                res.send(responseData)
                                console.log('Response yuborildi....')
                            })
                        })
                    })
            })
    } catch (error) {
        console.log('error', error)
            // appropriately handle the error
    }
})
module.exports = app;
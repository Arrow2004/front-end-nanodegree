const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
var app = express();
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());
app.use(express.static('./website'))
const port = 5000;
function listening(){
    console.log(`running on localhost: ${port}`)
}
const server = app.listen(port, listening());
projectData = {};


app.post('/animal', addAnimal);

function addAnimal (req,res){
    data = req.body;
    projectData = data;
    console.log(projectData)
};

app.get('/all', sendData);

function sendData (req, res) {
  res.send(projectData);
};
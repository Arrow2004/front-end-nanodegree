var  temp = document.querySelector('#temp');
var iconW = document.querySelector('#iconW');
var cityName = document.querySelector('.cityName');
var date = document.querySelector('#date')
var wParam = document.querySelector('#content');
var max_min = document.querySelector('#max-min');
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&units=metric&APPID=368aee06ac4c842fd77a361d89acd02b';
  document.getElementById('generate').addEventListener('click', performAction);
function performAction(e){
    const cityName =  document.getElementById('cityName').value;
    getWeather(baseURL,cityName,apiKey).then(function(data){
      postData('/animal', {temp: data.main.temp, minmax: [data.main.temp_min, data.main.temp_max], city: [cityName,data.sys.country], ico: data.weather[0].icon, content: data.weather[0].main});
    }).then(
      retrieveData('/all')
    );
  }
const getWeather = async (baseURL, city, key)=>{
    const res = await fetch(baseURL+city+key)
    try {
      const data = await res.json();
      return data;
    }  catch(error) {
      console.log("error", error);
    }
    return data;
  }
const postData = async ( url = '', data = {})=>{
      const response = await fetch(url, {
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      credentials: 'same-origin', // include, *same-origin, omit
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
  
      try {
        return true;
      }catch(error) {
      console.log("error", error);
      // appropriately handle the error
      }
  }
const retrieveData = async (url='') =>{ 
    const request = await fetch(url);
    try {
        const data = await request.json();
        temp.innerHTML = Math.round(data.temp)+'&#8451';
        max_min.innerHTML = `${Math.round(data.minmax[0])}&#8451/${Math.round(data.minmax[1])}&#8451`;
        cityName.innerHTML = `${data.city[0]} (${data.city[1]})`;
        iconW.setAttribute('src','http://openweathermap.org/img/w/'+data.ico+'.png');
        let d = new Date();
        date.innerHTML = (d.getMonth()+1) + "." + d.getDate() + "." + d.getFullYear();
        wParam.innerHTML = data.content;
    }
    catch(error) {
      console.log("error", error);
    }
  };
  getWeather(baseURL,'Tashkent',apiKey).then(function(data){
    postData('/animal', {temp: data.main.temp, minmax: [data.main.temp_min, data.main.temp_max], city: ['Tashkent',data.sys.country], ico: data.weather[0].icon, content: data.weather[0].main});
  }).then(
    retrieveData('/all')
  );
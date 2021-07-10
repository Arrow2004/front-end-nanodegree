const results = document.getElementById('results');
const cnRes = document.getElementById('cnRes');
const temp = document.getElementById('temp');
const date = document.getElementById('dateRes');
const images = document.getElementsByTagName('img');
const postData = async(url, data = {}) => {
    const res = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    try {
        return await res.json()
    } catch (error) {
        console.log('error', error)
    }
}
const handleSubmit = async(data) => {
    //if the Url is valid send post sata
        const response = postData('http://localhost:3000/getAllData', {
        data: data,
        })

        response.then((res) => {
            console.log(res);
            console.log(data)
            cnRes.innerHTML= `City name: ${data[0]}`;
            date.innerHTML = `Date: Now: ${(new Date().toJSON()).slice(0,10)}/Travel: ${data[1]}`;
            temp.innerHTML = `Temperature: ${res[1].temp} &#8451 Max/Min: ${res[1].max_min[0]} &#8451/${res[1].max_min[1]}&#8451`
            console.log(images)
            console.log(res[0])
            for(let i = 0; i<images.length;i++){
                images[i].setAttribute('src', res[0][i]);
            }
        })
   
}

export { handleSubmit }
import { check } from './checkUrl'

const results = document.getElementById('results')
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
const handleSubmit = async(url) => {
    if (check(url)) {
    //if the Url is valid send post sata
        const response = postData('http://localhost:3000/evaluateArticle', {
        url: url,
        })
        response.then((res) => {
        //Show result in view
                results.innerHTML = resultTemplate( res.model, res.score_tag, res.agreement, res.subjectivity, res.confidence, res.irony)
        })
    } else {
        alert('this Url is not valid!')
    }
}
const resultTemplate = ( model, score, agreement, subjectivity, confidence, irony) => {
        return `<p><strong>model: </strong><span>${model}</span></p> <p><strong>score_tag: </strong><span>${score}</span></p> <p><strong>agreement: </strong><span>${agreement}</span></p> <p><strong>subjectivity: </strong><span>${subjectivity}</span></p> <p><strong>confidence: </strong><span id="">${confidence}</span></p> <p><strong>irony: </strong><span id="irony">${irony}</span></p>`
    }


export { handleSubmit }
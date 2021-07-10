import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
import './styles/resets.scss'
import { handleSubmit } from './js/formHandler.js'
const onSubmit = document.getElementById('onSubmit')

window.addEventListener('DOMContentLoaded', () => {
    onSubmit.addEventListener('click', () => {
        const cityName = document.getElementById('cityName').value;
        const date = document.getElementById('date').value
        const data = [cityName, date]
        if (cityName === '' || date === '') {
            alert(`Please. Enter city name and date`)
        } else {
            handleSubmit(data)
        }
    })
})
console.log('CHANGE!!')
import './styles/base.scss'
import './styles/footer.scss'
import './styles/form.scss'
import './styles/header.scss'
import './styles/resets.scss'
import { handleSubmit } from './js/formHandler.js'
const onSubmit = document.getElementById('onSubmit')

window.addEventListener('DOMContentLoaded', () => {
    onSubmit.addEventListener('click', () => {
        const url = document.getElementById('url').value
        if (url === '') {
            alert(`Enter a Url`)
        } else {
            handleSubmit(url)
        }
    })
})
console.log('CHANGE!!')
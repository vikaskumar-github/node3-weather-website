console.log('client side javascript is loaded')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const location = search.value
    console.log(location)
    messageOne.textContent = 'loading...'
    messageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address=' + location ).then( (response) => {
        response.json().then( (data) => {
            if(data.error){
                messageOne.textContent = data.error
            }
            else{
                console.log(data)
                messageOne.textContent = data.location
                messageTwo.textContent = 'Its '+ data.forecast.weather_descriptions + ' and temperature is ' + data.forecast.temperature
                
            }
        })
    })


})

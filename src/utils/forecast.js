const request = require('request')

const forecast = (latitude, longitude, callback) => {

    const forecastUrl = 'http://api.weatherstack.com/current?access_key=5b9f0f779f400e964dbc47f29b2050bc&query=' + latitude + ',' + longitude

    request({url: forecastUrl, json: true}, (error,response)=> {
        if(error){
            callback('some error has occured', undefined)
        } else if (response.body.success === false){
            callback('request failed !',undefined)
        } else {
            callback(undefined, response.body.current)
        }
    })
}

module.exports = forecast


const request = require('request')


const geocode = (address, callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoidmlrYXNrdW1hcjE2IiwiYSI6ImNraDF6bGxtZzA1cDUycm9pdzd0ZnE3ZmYifQ.VVySAI1mgRRfr-C48WqzYQ&limit=5'

    request({url: url, json: true}, (error, response)=>{
        if(error){
            callback('unable to connect to location services!', undefined)

        }else if(response.body.features.length === 0){
            callback('unable to find location. Try another search',undefined)
         
        }else{
            callback(error,{
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0],
                location:  response.body.features[0].place_name                 

            })
        }
        
    })
}


module.exports = geocode
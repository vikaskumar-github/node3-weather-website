const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode= require('./utils/geocode')
const forecast= require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static dirctory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'weather app',
        name: 'vikas kumar'
    })
})

app.get('/about',(req, res) => {
    res.render('about',{
        title: 'About me',
        name: 'vikas kumar'
    })
})

app.get('/help',(req, res) => {
    res.render('help',{
        title: 'Help',
        name: 'vikas kumar',
        message: 'this is my message'
    })
})



app.get('/weather',(req,res) => {
    console.log(req.query.address)
    if(!req.query.address){
        return res.send ({
            error: 'address string is not provided'
        })
    }

    const address= req.query.address
    geocode(address, (error, data) => {
        if(error){
            return res.send({ error })
        }
    
        forecast(data.latitude, data.longitude, (error, forecastData) => {
            if(error){
                return res.send({ error })
            }
            
            res.send({
                address: req.query.address,
                location: data.location,
                forecast: forecastData
            })
            
            
          })
    })


})


app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'you must provide search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})
// app.com
// app.com/help
// app.com/about


app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Vikas kumar',
        errorMessage: 'Help page not found'
    })
})
// This need to be in last
app.get('/*',(req, res) => {
    res.render('404',{
        title: '404',
        name: 'Vikas kumar',
        errorMessage: 'Page not found'
    })
})

app.listen(3000, () => {
    console.log('server is up on port 3000.')
})

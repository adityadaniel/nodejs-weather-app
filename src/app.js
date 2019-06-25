const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define parts for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        'title': 'Weather App',
        'name': 'Daniel Aditya'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        'title': 'About Me',
        'name': 'Aditya Daniel' 
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        'title': 'Help page',
        'helpText': 'You are seeing help text',
        'name': 'Aditya'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            'error': 'Please provide an address'
        })
    } else {
        const address = req.query.address
        geocode(address, (error, { latitude, longitude, location} = {}) => {
            if (error) {
                return res.send({
                    error
                })
            }

            forecast(latitude, longitude, (error, { summary, temperature, rainChance}) => {
                if (error) {
                    console.log(error)
                }
                res.send({
                    location: location,
                    summary: summary,
                    temperature: temperature,
                    rainChance: rainChance
                })
            })
        })
    }
})

app.get('*', (req, res) => {
    res.send('My 404 page')
})

app.listen(3000, () => {
    console.log('server starting up at port 3000')
})
const request = require('request')

const forecast = (latitude, longitude, callback) => {
    let endpointUrl = `https://api.darksky.net/forecast/a4a8d85950aa348be75d66fc6b7fe3ce/${latitude},${longitude}`

    request({ url: endpointUrl, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather services', undefined)
        } else if (body.error) {
            callback('Error fetching weather. Please try again!', undefined)
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                rainChance: body.currently.precipProbability,
            })
        }
    })
}

module.exports = forecast
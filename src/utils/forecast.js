const request = require('request');

const apiKey = '1feb75fb245aac3803aa3b5c13c36b58'

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/${apiKey}/${latitude},${longitude}`;
    request({
        url,
        json:true
    },(error,response) => {
        if(error){
            callback("Unable to connect to weather services");
        }
        const data = response.body;
        if(data.hasOwnProperty('eroor')){
            callback(data['error'])
        }else{
            callback(undefined,{
                temperature:data.currently.temperature,
                precipProbability:data.currently.precipProbability,
                summary:response.body.daily.data[0].summary,
                temperatureMin:response.body.daily.data[0].temperatureMin,
                temperatureMax:response.body.daily.data[0].temperatureMax
            })
        }
    })
}
module.exports=forecast;
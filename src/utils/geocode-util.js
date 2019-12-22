const request = require('request');

const geoCode = (address, callback) => {
    const accessToken = 'pk.eyJ1IjoiYWx1Z2FsYXNhaXJhbSIsImEiOiJjazN4MmY5N2IwN2J4M21wNjVuM3RhNnFpIn0.f24Zkp0NynmjKc5z4r7IxA';
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address)+'.json?access_token='+accessToken+'&limit=1';
    request({
        url,
        json:true
    },(error,{body}) => {
        if(error){
            callback("Unable to connect to location services!");
        }
        if(body.features.length==0){
            callback("Unable to find the location. Try with another one.");
        }else{
            callback(undefined,{
                latitude:body.features[0].center[1],
                longitude:body.features[0].center[0],
                location:body.features[0].place_name
            })
        }

    })
}

module.exports = geoCode;
const request = require("request")

const geoCode = (address , callback) =>{
  const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoiYmhhcmF0aHBhcnNhbSIsImEiOiJjbDBheGo0cXkwOXFuM29yMTBsYnpsbzc3In0.oXCuHe67NpymyvZIy4UDgw"
  request({url,json:true},(error,{body}) =>{
    if(error){
      callback("unable to connect",undefined)
    }else if(body.features.length === 0){
      callback("unable to find the location. Try another search",undefined)
    }else{
      callback(undefined,{
        latitude:body.features[0].center[0],
        longitude:body.features[0].center[1],
        location:body.features[0].place_name 
      })
    }
  })
}

module.exports = geoCode
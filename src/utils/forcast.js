const request = require("request")

const forcast = (lat,long,callback) =>{

  const url = "http://api.weatherstack.com/current?access_key=27f951401f91dc94a213d1c2ea696881&query="+long+","+lat

  request({url:url,json:true},(error,{body}) =>{
    if(error){
      console.log("no internet",undefined)
    }else if(body.error){
      console.log("issue in finding location",undefined)
    }else{
      // console.log(body)
      // const payloadresp = {
      //   temperature: response.body.current.temperature,
      //   location: response.body.location.name,
      //   perception:response.body.current.precip
      // }
      // const {temperature,location,perception } = payloadresp
      callback(undefined,"It is currently " + body.current.temperature + " out at " + body.location.name + ". There is a " + body.current.precip +"% rain today and its "+body.current.weather_descriptions[0])

      // console.log(response.body.features[0].center[0])
      // console.log(response.body.features[0].center[1])
    } 
  })
}

module.exports = forcast
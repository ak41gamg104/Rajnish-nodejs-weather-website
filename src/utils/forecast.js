const request=require('request')

const forecast=(latitude,longitude,location,callback)=>{

    const url='https://api.darksky.net/forecast/7ed05dc51bec58ab4c1f7bab1cc150b0/'+latitude+','+longitude

    request({url:url,json:true},(error,response)=>
    {

    if(error)
    {
        callback("Unable to contact to forecast",undefined)
    }
    else if(response.body.error)
    {
        callback("Unable to find location",undefined)
    }
    else
    {
        
        callback('undefined',{
            forecast:response.body.daily.data[0].summary +'It is currently '+response.body.currently.temperature +' degress out.This High today is '+response.body.daily.data[0].temperatureHigh+' with a low off '+response.body.daily.data[0].temperatureLow + '. There is a '+response.body.currently.precipProbability+ ' percent chance of rain.',
            location:location
           
        });

    }


    })

}

module.exports=forecast;


const path=require('path')
const express=require('express')
const hbs=require('hbs')
const bodyParser=require('body-parser')
const request=require('request')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')


const app=express();
app.use(bodyParser.json())

//define path for express config
const publicDirectoryPath=path.join(__dirname,'../public');
const viewsPath=path.join(__dirname, '../templates/views');
const partialPath=path.join(__dirname, '../templates/partials');


//setup handlers engine and views location

app.set('view engine','hbs')
app.set('views',viewsPath );
hbs.registerPartials(partialPath)

//set up sattic directory to serve
app.use(express.static(publicDirectoryPath))


 app.get('/',(req,res)=>{
     res.render('index',{
         title: 'Weather App',
         createdBy: 'Rajnish'
     })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About Me',
        createdBy: 'Akash'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helptext: 'This is something helpful text',
        title:'Help Me',
        createdBy: 'Andrew Mead'
       
    })
})

 

app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
       return res.send({
            error: 'You must provide a Address'
        })
    }
   var add=req.query.address;
   console.log(add)
    geocode(add,(error,data)=>{
        console.log('Error', error)
        if(error)
        {
            return res.send({ error})
        }
       console.log(data)
        forecast(data.latitude,data.longitude,data.location,(error, forecastdata) => {
            //confusion in this 
            /* if(error)
            {
                return res.send({ error})
            }  */ 
            console.log(forecastdata)
           res.send({
               forecast:forecastdata.forecast,
               location:forecastdata.location,
               
                address:req.query.address
              })
         })
   
   
    }) 
    
   
})






app.get('/products',(req,res)=>{
     if(!req.query.search)
     {
        return res.send({
             error: 'You must provide a search term'
         })
     }
    
    console.log(JSON.stringify(req.query))
    res.send({
        products:[]
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title: '404',
        createdBy :'Rajnish Anand',
        errorMessage:'Help Article Not found'
  
    })
}) 



app.get('*',(req,res)=>{
  res.render('404',{
      title: '404',
      createdBy :'Rajnish Anand',
      errorMessage:'Page Not Found'

  })
})


 
app.listen(3000,()=>{
    console.log("Server Started at port 3000")
});

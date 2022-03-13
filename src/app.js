const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geoloaction")
const forcast = require("./utils/forcast")

const app = express()

const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set("view engine","hbs")
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static( publicDirectoryPath))

app.get("",(req,res) =>{
  res.render("index",{
    title:"Weather",
    name:"bharath"
  })
})

app.get("/help",(req,res) =>{
  res.render("help",{
    title:"Help",
    name:"bharath",
    helpfultext:"This is the some helpful text content"
  })
})

app.get("/about",(req,res) =>{
  res.render("about",{
    title:"About",
    name:"bharath"
  })
})

app.get("/weather",(req,res) =>{
  if(!req.query.address){
    return res.send("Please send the location to get the details")
  }
  geocode(req.query.address,(error,{latitude,longitude,location} = {})=>{
    if(error){
      return res.send({error})
    }
    forcast(latitude,longitude,(error,forcastData)=>{
      if(error){
        return res.send({error})
      }
      res.send({
        forcast:forcastData,
        location,
        address:req.query.address
      })
    })
  })
})

app.get("/products",(req,res)=>{
  if(!req.query.search){
    return res.send({
      error:"you must provide search term"
    })
  }
  console.log(req.query)
  res.send({
    product:[]
  })
})

app.get("/help/*",(req,res) =>{
  res.render("404",{
    title:"Not Found",
    errorMessage:"No Help Data found",
    name:"bharath"
  })
})

app.get("*",(req,res) =>{
  res.render("404",{
    title:"Not Found",
    name:"bharath"
  })
})

app.listen(3000,() =>{
  console.log("Server is up on port 3000")
})
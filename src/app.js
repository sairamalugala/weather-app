const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode-util');


const app = express()

const PORT = process.env.PORT || 3000;

// Define paths for Express config
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
        title: 'Weather',
        name: 'Sairam'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sairam'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Sairam'
    })
})

app.get('/weather', (req, res) => {

    const address = req.query.address;
    if(!address){
        return res.send({
            error:"Address is missing."
        })
    }

    geocode(address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({
                error
            })
        }
        forecast(latitude,longitude, (error,{temperature, precipProbability,summary}={})=>{
            if(error){
                return res.send({
                    error
                })
            }
            res.send({
                forecast: summary,
                temperature,
                rainProbability:precipProbability,
                location,
                address
            })
        })
    })

})


app.get('/prods', (req,res) =>{
    const products=[
        { "Name": "Cheese", "Price" : 2.50, "Location": "Refrigerated foods"},
        { "Name": "Crisps", "Price" : 3, "Location": "the Snack isle"},
        { "Name": "Pizza", "Price" : 4, "Location": "Refrigerated foods"},
        { "Name": "Chocolate", "Price" : 1.50, "Location": "the Snack isle"},
        { "Name": "Self-raising flour", "Price" : 1.50, "Location": "Home baking"},
        { "Name": "Ground almonds", "Price" : 3, "Location": "Home baking"}
      ];
    const prodNme = req.query.name;
    if(!prodNme){
        res.send({
            error:'Product name is missing'
        })
        return;
    }
    res.send({
        products
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sairam',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Sairam',
        errorMessage: 'Page not found.'
    })
})

app.listen(PORT, () => {
    console.log('Server is up on port'+PORT)
})
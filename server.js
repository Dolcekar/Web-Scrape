var request = require('request');
var cheerio = require('cheerio');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var logger = require('morgan');
var axios = require('axios');
//passing the database
var db = require('./models');

//Setting up PORT
var PORT = 4200;

//initialize Express
var app = express();

// Configuring Middleware

app.use(logger("dev"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

//Connecting to Mongo **question**url?
mongoose.connect("mongoosedb://localhost/web-scrape", {useNewUrlParser: true});

//Routes
app.get("/scrape" ,function(req, res) {
    axios.get("https://blogs.scientificamerican.com/").then(function(response) {
        $ = cheerio.load(response.data);
            $("article h2").each(function(i, element) {
                results = {};
                
            })
    })



})
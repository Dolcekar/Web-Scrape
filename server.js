var request = require('request');
var express = require('express');
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
mongoose.connect("mongodb://localhost:27017/web-scrape", {useNewUrlParser: true});

//Routes
app.get("/scrape" ,function(req, res) {
    axios.get("https://blogs.scientificamerican.com/").then(function(response) {
        $ = cheerio.load(response.data);
            $("article h2").each(function(i, element) {
                results = {};
                    results.title = $(this).children("a").text();

                    results.link = $(this).children("a").attr("href");

                    db.Article.create(results)
                        .then(function(dbArticle) {
                        // View the added result in the console
                        console.log(dbArticle);

                      }).catch(function(err) {
                        // If an error occurred, send it to the client
                        return res.json(err);
                      });
                  });
              
                  // If we were able to successfully scrape and save an Article, send a message to the client
                  res.send("Scrape Complete");


        });
    });


app.listen(PORT, function() {
    console.log("App running on port " + PORT + "!");
  });
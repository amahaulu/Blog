//jshint esversion:6


const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require('lodash');
const https = require("https");

//starting contents from Udemy
const homeStartingContent = "Content";
const aboutContent = "Content";
const contactContent = "Content";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

//global variable array for posts
let posts = [];

app.get("/",function(req, res){
  res.render("home",
    {homeStarting:homeStartingContent,
    posts:posts
  });
});

app.get("/about",function(req, res){
  res.render("about", {about:aboutContent});

});

app.get("/contact",function(req, res){
  res.render("contact", {contact:contactContent});
});

app.get("/compose",function(req,res){
  res.render("compose");
});

app.get("/posts/:postName", function(req,res){
  const requestTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);


  if(storedTitle == requestTitle){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  }
  });


});

let weathers = [];

//getting the weather page
app.get("/weather", function(req,res){
  res.render("weather", {
    weathers:weathers
  });
});
app.get("/posts/:postName", function(req,res){
  const requestTitle = _.lowerCase(req.params.postName);

  posts.forEach(function(post){
    const storedTitle = _.lowerCase(post.title);


  if(storedTitle == requestTitle){
    res.render("post", {
      title: post.title,
      content: post.content
    });
  }
  });


});

//invoked after hitting go in the html form
app.post("/weather", function(req, res) {
    
    // takes in the city from the html form, display in // console. Takes in as string.
        var cityname = String(req.body.city);
        console.log(req.body.city);
    
    //build up the URL for the JSON query, API Key is // secret and needs to be obtained by signup 
        const units = "imperial";
        const apiKey = "3b551261447f0cb0c1cf47ef4c30c323";
        const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityname + "&units=" + units + "&APPID=" + apiKey;
      
      https.get(url, function(response){
        console.log(resonse.statuscode);
      

        // gets individual items from Open Weather API
        response.on("data", function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const city = weatherData.name;
            const humidity = weatherData.main.humidity;
            const windSpeed = weatherData.wind.speed;
            const windDirection = weatherData.wind.deg;
            const weatherDescription = weatherData.weather[0].description; 
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"; 
                         
              const weather = {
                city: city,
                image: imageURL,
                temp: Math.round(temp),
                weatherDescription: weatherDescription,
                humidity: humidity,
                windDirection: windDirection
              };
              weathers.push(weather);
              res.redirect("/weather");
        });
    });
})





app.listen(3000, function() {
  console.log("Server started on port 3000");
});

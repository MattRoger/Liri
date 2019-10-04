require("dotenv").config({ path: ".env" });
var keys=require("./keys.js");
require('node-spotify-api');
console.log("here we are")
require("fs");
var Spotify=require('node-spotify-api');

var spotify = new Spotify(keys.spotify);


var inquirer = require("inquirer");
var axios = require("axios");

var typeSearch = process.argv[2]
var searchContent = (process.argv.slice(3))
// 


// console.log(typeSearch + " search type")
if (typeSearch === "concert-this") {
    bands();
};
if (typeSearch === "movie-this") {
    movie();
}
if (typeSearch = "spotify-this-song") {
    console.log("thus worked")
    spotifyx();
}

function bands() {
    var artist = searchContent.join("");
    console.log(artist)
    axios.get("https://rest.bandsintown.com/artists/"
        + artist + "/events?app_id=codingbootcamp").then(
            function (response) {

                var venueName = response.data[0].venue.name;
                var region = response.data[0].venue.region;
                var city = response.data[0].venue.city;
                var date = response.data[0].datetime;
                console.log(`${searchContent.join(" ")} is playing at ${venueName}, ${region} ${city} on ${date} `)
            })

}
function movie() {
    var movie = searchContent.join("+");
    console.log(movie)
    axios.get("http://www.omdbapi.com/?t=" + movie +
        "&y=&plot=short&apikey=trilogy").then(
            function (response) {
                var res = response.data;
                var title = res.Title;
                var year = res.Year;
                var iRating = res.imdbRating;
                var rTrating = res.Ratings[1].Value;
                var country = res.Country;
                var lang = res.Language;
                var plot = res.Plot;
                var actors = res.Actors;
                console.log(
                    `${title}, ${year} + staring ${actors}
        ${plot}
        Imdb rates this movie ${iRating} and Rotten Tomatoes rates it ${rTrating} fresh.
        ${title} was filmed in ${country} and produced in ${lang}.`)
            }
        )
}
function spotifyx() {

    console.log("spotify function connected")
    var spotifySearch = searchContent.join(" ")
    spotify
    .search({ type: 'track', query: spotifySearch })
    .then(function (response){
        var song =spotifySearch;
        var songSearch=response.tracks.items[0].album.artists[0];
        var artist=response.tracks.items[0].album.artists[0].name;
        var album=response.tracks.items[0].album.name;
        var previewURL=response.tracks.items[0].preview_url;
        if(previewURL===null){
            var previewURL="No Preview URL Available"
        }
        console.log(`${song} by ${artist}. Album:${album}
        preview it here! ${previewURL} `)        

    })
}




// concert-this

// movie-this
// do-what-it-says

// node liri.js concert-this <artist/band name here>
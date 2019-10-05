require("dotenv").config({ path: ".env" });
var keys = require("./keys.js");
require('node-spotify-api');
var moment = require("moment");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var spotifySearch;
var entry;
var typeSearch = process.argv[2]
var searchContent = (process.argv.slice(3))
var now="Searched on " + moment().format('MMMM Do YYYY, h:mm:ss a')+"\n";

if (typeSearch === "concert-this") {
    bands();
};
if (typeSearch === "movie-this") {
    movie();
}
if (typeSearch === "spotify-this-song") {
    var spotifySearch = searchContent.join(" ")
    spotifyx();
}
if (typeSearch === "do-what-it-says") {
    doIt();
}
function bands() {
    var artist = searchContent.join("");
    axios.get("https://rest.bandsintown.com/artists/"
        + artist + "/events?app_id=codingbootcamp").then(
            function (response) {
                var venueName = response.data[0].venue.name;
                var act = searchContent.join(" ");
                var act = act.toUpperCase(act);
                var region = response.data[0].venue.region;
                var city = response.data[0].venue.city;
                var date = response.data[0].datetime;
                var date = moment(date).format("L");
                entry = `${act}
                 Playing at ${venueName},
                 ${region} ${city} on ${date}.
                 
                 `
                console.log(entry)
                writeThis();
            })

}
function movie() {
    var movie = searchContent.join("+");
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
                entry = `Title: ${title}.
                Year: ${year}.
                Staring ${actors}.
                Plot: ${plot}
                Filmed in:${country}.
                Language: ${lang}.
                IMDB RATING:${iRating}                    
                Rotten Tomatoes rating: ${rTrating} fresh.
                
                `
                console.log(entry)
                writeThis()
            }
        )
}
function spotifyx() {
    spotify
        .search({ type: 'track', query: spotifySearch })
        .then(function (response) {
            var song = spotifySearch;
            var song = song.toUpperCase(song)
            var artist = response.tracks.items[0].album.artists[0].name;
            var album = response.tracks.items[0].album.name;
            var previewURL = response.tracks.items[0].preview_url;
            if (previewURL === null) {
                var previewURL = "No Preview URL Available"
            }
            entry =
                `${song}
Artist${artist}.
Album:${album}
preview it here! ${previewURL}
        
        `
            console.log(entry)
            writeThis()
        })
}

function doIt() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        {
            if (error) {
                console.log(error);
            }
            var doItx = data.split(',')
            spotifySearch = doItx[1]
            spotifyx();
        }
    })
}
function writeThis() {
    fs.appendFile("mySearch.txt", entry+now, function (err) {
        if (err) {
            return console.log(err);
        }
        console.log("mySearch.txt was updated!");
    });
}

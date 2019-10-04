require("./liri.js");
require("dotenv").config({ path: ".env" });

console.log('this is loaded');

function Spotify(id, secret){
  this.id=id,
  this.secret=secret
}

var spotify= new Spotify(
  process.env.SPOTIFY_ID, process.env.SPOTIFY_SECRET
)
exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};






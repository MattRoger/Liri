# Liri
liri bot



Liri bot is a node search tool for Omdb api, bandsInTown api, and spotify. 

**concert-this**
Enter a concert-this followed by the band you would like to search for.
example: node liri.js concert-this phil collins
This returns the Venue, state, and city the artist is preforming at.
![concert-this](https://github.com/MattRoger/Liri/blob/master/liri/concert-this.png?raw=true)

**movie-this**
example: node liri.js movie-this die hard
returns the movie name, release year,actors, plot, imdb and rotten tomatoes ratings, filming locations, and release languages. 

**spotify-this-song**
example: node liri.js spotify-this-song ring of fire
returns the song, artist, album, and if available and preview url. If no preview url is avaivable, liri will console.log no preview available.

**do-what-it-says**
example: node liri.js do-what-it-says
this reads from the random.txt file and finds the song in the file on spotify.

liri also logs each search to the **mySearch.txt** file with a time and date stamp. 

**See liri in action**
https://drive.google.com/open?id=1BvtpHhYFhQdkqiJVo61CsyuwNjISSsgb - automatic!


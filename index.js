const express = require("express");
const path = require("path");
const axios = require("axios");
const dotenv = require("dotenv");

const app = express();
const port = process.env.PORT || "8888";

dotenv.config();

const trakt = "https://api.trakt.tv";
const headers = {
  "Content-Type": "application/json",
  "trakt-api-version": 2,
  "trakt-api-key": process.env.TRAKT_CLIENT_ID,
};

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//set up static path (for use with CSS, client-side JS, and image files)
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  displayTrendingMovies(res);
});

app.get("/popular", (req, res) => {
  displatPopularShow(res);
});

//server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});

//function to display trending movies
function displayTrendingMovies(res) {
  var pageData = {
    title: "Home",
    movies: null,
  };
  axios(
    //the request
    {
      url: "/movies/trending?extended=full",
      baseURL: trakt,
      method: "get",
      headers,
    }
  )
    .then(function (response) {
      //on success do stuff
      pageData.movies = response.data; //store JSON results in pageData.movies (previously null)
      res.render("index", pageData);
    })
    .catch(function (error) {
      console.error(error);
    });
}

function displatPopularShow(res) {
  var pageData = {
    title: "Popular Shows",
    shows: null,
  };
  axios(
    //the request
    {
      url: "/shows/popular?page=1&limit=15",
      baseURL: trakt,
      method: "get",
      headers,
    }
  )
    .then(function (response) {
      pageData.shows = response.data.map((s) => {
        return {
          title: s.title,
          year: s.year,
          imdbUrl: `https://imdb.com/title/${s.ids.imdb}`,
        };
      });
      res.render("popularShows", pageData);
    })
    .catch(function (error) {
      console.error(error);
    });
}

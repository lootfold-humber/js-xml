const express = require("express");
const app = express();

const axios = require("axios");

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.port || "3000";

const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

app.get("/", (req, res) => {
  res.render("index", {
    title: "Movie Reviews",
  });
});

app.get("/search", async (req, res) => {
  const { search_key } = req.query;
  const data = await getSearchResults(search_key);
  res.render("results", { data });
});

app.get("/movie", async function (req, res) {
  const { name, year } = req.query;
  const data = await getMovieInfo(name, year);
  res.render("details", { data });
});

async function getSearchResults(searchKey) {
  const omdbBaseUrl = process.env.OMDB_URL;
  const omdbApiKey = process.env.OMDB_API_KEY;
  const url = `${omdbBaseUrl}/?apikey=${omdbApiKey}&s="${searchKey}"`;

  const { data } = await axios.get(url);
  const { Search: search } = data;

  return search;
}

async function getMovieInfo(name, year) {
  const review = await getNYTReviewLinks(name, year);
  const translated = await getYodaTranslation(review.summary);
  review.summary = translated;

  return review;
}

async function getNYTReviewLinks(name, year) {
  const nytBaseUrl = process.env.NY_TIMES_URL;
  const nytApiKey = process.env.NY_API_KEY;
  const dateRange = `${year}-01-01:${year}-12-31`;

  const url = `${nytBaseUrl}?opening-date=${dateRange}&query=${name}&api-key=${nytApiKey}`;
  const { data } = await axios.get(url);

  const reviews = data.results.map((r) => {
    return {
      title: r.display_title,
      rating: r.mpaa_rating,
      summary: r.summary_short,
      publishDate: r.publication_date,
      openingDate: r.opening_date,
      reviewLink: r.link.url,
    };
  });

  return reviews[0];
}

async function getYodaTranslation(text) {
  const body = {
    text,
  };
  const url = process.env.YODA_TRANSLATION_URL;
  const { data } = await axios.post(url, body);
  return data.contents.translated;
}

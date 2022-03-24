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
  console.log(data);
  // res.render("results", data);
});

async function getSearchResults(searchKey) {
  const omdbBaseUrl = process.env.OMDB_URL;
  const omdbApiKey = process.env.OMDB_API_KEY;
  const url = `${omdbBaseUrl}/?apikey=${omdbApiKey}&s="${searchKey}"`;

  const { data } = await axios.get(url);
  const { Search: search } = data;

  return search;
}

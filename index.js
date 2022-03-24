const express = require("express");
const app = express();

const service = require("./service");

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
  const data = await service.searchMovies(search_key);
  res.render("results", { title: "Search Results", data });
});

app.get("/movie", async function (req, res) {
  const { id } = req.query;
  const data = await service.getMovieInfo(id);
  res.render("details", { title: data.title, data });
});

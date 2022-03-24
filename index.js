const express = require("express");
const path = require("path");

const app = express();
const port = process.env.port || "3000";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Movie Reviews",
  });
});

app.get("/search", (req, res) => {
  const { search_key } = req.query;
  console.log(search_key);
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

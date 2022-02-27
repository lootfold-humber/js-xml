const express = require("express");
const path = require("path");

const app = express();
const port = process.env.port || "3000";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (request, response) => {
  response.render("index", {
    title: "Pet Store",
  });
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

const express = require("express");
const path = require("path");

const app = express();
const port = process.env.port || "3000";

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (request, response) => {
  response.render("index", {
    title: "Grocery Store",
  });
});

app.get("/list", (request, response) => {
  response.render("list", {
    title: "Product List",
  });
});

app.get("/cart", (request, response) => {
  response.render("cart", {
    title: "Checkout",
  });
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

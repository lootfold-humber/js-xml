const exp = require("express");
const path = require("path");
const fs = require("fs");
const jsDom = require("jsdom");
const { JSDOM } = jsDom;

const port = "3000";
const app = exp();

let dom, libData;
const ns = "http://www.opengis.net/kml/2.2";
loadData();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

app.get("/", (req, res) => {
  res.render("list", {
    title: "Select library",
    libs: getList(),
  });
});

app.get("/details", (req, res) => {
  const id = req.query["branch"];
  const library = getLibrary(id);
  res.render("details", {
    title: library.name,
    lib: library,
  });
});

function loadData() {
  fs.readFile("./data/library-data.kml", "UTF-8", (err, data) => {
    dom = new JSDOM(data, { contentType: "application/xml" });
    libData = dom.window.document;
  });
}

function getList() {
  list = [];
  const libs = libData.querySelectorAll("Placemark");
  for (let i = 0; i < libs.length; i++) {
    const lib = libs[i];
    list.push({
      id: lib.getAttribute("id"),
      name: lib.querySelector("name").textContent,
    });
  }
  return list;
}

function getLibrary(id) {
  const library = libData.querySelector(`[id=${id}]`);
  const splits = library
    .querySelector("description")
    .textContent.split("<br/>Link: ");

  const lib = {
    name: library.querySelector("name").textContent,
    address: library.querySelector("address").textContent,
    phoneNumber: library.querySelector("phoneNumber").textContent,
    description: splits[0],
    link: splits[1],
  };
  return lib;
}

const express = require("express");
const app = express();
const port = process.env.port || "3000";

// set how to parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

// setup assets dir
const path = require("path");
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
app.use(express.static(path.join(__dirname, "public")));

// mongo db setup
const mongo = require("mongodb").MongoClient;
const dbUrl = "mongodb://localhost:27017/lab3";
const ObjectId = require("mongodb").ObjectId;
const collectionName = "cats";

let db, cats;
mongo.connect(dbUrl, (err, client) => {
  if (err) {
    console.error(err);
  }

  db = client.db("lab3");
  getCatsFromDb();
});

// list page
app.get("/", (req, res) => {
  res.render("index", {
    title: "List",
    cats: cats,
  });
});

// add page
app.get("/add", (req, res) => {
  res.render("add", {
    title: "Add",
    cats: cats,
  });
});

// edit page
app.get("/edit", (req, res) => {
  const id = ObjectId(req.query.id);
  let catToEdit;
  db.collection(collectionName).findOne({ _id: id }, (err, dbRes) => {
    catToEdit = dbRes;
    res.render("edit", {
      title: "Edit",
      cat: catToEdit,
    });
  });
});

// add api
app.post("/api/add", (req, res) => {
  const newCat = req.body;
  db.collection(collectionName).insertOne(newCat, (err, dbRes) => {
    getCatsFromDb();
    res.redirect("/");
    if (err) console.error(err);
  });
});

// edit api
app.post("/api/edit", (req, res) => {
  const cat = req.body;
  db.collection(collectionName).updateOne(
    { _id: ObjectId(cat.id) },
    {
      $set: {
        name: cat.name,
        breed: cat.breed,
      },
    },
    { new: true },
    (err, dbRes) => {
      getCatsFromDb();
      res.redirect("/");
    }
  );
});

// delete api
app.get("/api/delete", (req, res) => {
  const id = ObjectId(req.query.id);
  db.collection(collectionName).deleteOne({ _id: id }, (req, dbRes) => {
    getCatsFromDb();
    res.redirect("/");
  });
});

function getCatsFromDb() {
  db.collection(collectionName)
    .find({})
    .toArray((err, res) => {
      if (res) {
        cats = res;
      }
      if (err) {
        console.error(err);
      }
    });
}

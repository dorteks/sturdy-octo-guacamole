const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const res = require("express/lib/response");
const { home } = require("nodemon/lib/utils");
// const Blog = require("./models/blog");
const blogRoutes = require("./routes/blogRoutes");

const app = express();

//connect to mongoDB
const dbURI =
  "mongodb+srv://dorteks:kaydot245@nodelessons.utr3x.mongodb.net/nodelessons?retryWrites=true&w=majority";
mongoose
  .connect(dbURI)
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.set("view engine", "ejs");
app.set("views", "views2");

//middleware and static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
// app.use(morgan('common'));
// app.use(morgan('tiny'));
// app.use(morgan('short'));

//routes

//redirecting home page to /blogs
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

//about page
app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//blog routes
app.use(blogRoutes);

//404 page
app.use((req, res) => {
  res.render("404", { title: "404 page" });
});

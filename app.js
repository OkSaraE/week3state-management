"use strict";
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const app = express();
const port = 3000;

//not for próject

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const username = "foo";
const password = "bar";

app.use(cookieParser());
app.use(session({ secret: "Hauki on kala." }));

app.set("views", "./views");
app.set("view engine", "pug");

app.post("/login", (req, res) => {
  const passwd = req.body.password;
  const usern = req.body.username;
  if (usern === username && passwd === password) {
    res.session.kirjautunut = true;
    res.redirect("/secret");
  } else {
    res.redirect("/form");
  }
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/form", (req, res) => {
  res.render("form");
});

app.get("/secret", (req, res) => {
  if (req.session.kirjautunut) {
    res.render("secret");
  } else {
    res.redirect("/form");
  }
});

app.get("/setCookie/:clr", (req, res) => {
  res.cookie("color", req.params.clr, { httpOnly: true }).send("cookie set");
});

app.get("getCookie", (req, res) => {
  console.log("Cookies:", req.cookies.color);
  res.send("cookie read");
});

app.get("/deleteCookie", (req, res) => {
  res.clearCookie("color");
  res.send("cookie deleted");
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));

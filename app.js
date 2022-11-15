"use strict";
const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const passport = require('./utils/pass');
const app = express();
const port = 3000;

const loggedIn = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect('/form');
  }
};
//not for próject

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());

const username = "foo";
const password = "bar";

app.use(cookieParser());
app.use(session({ secret: "Hauki on kala." }));

app.set("views", "./views");
app.set("view engine", "pug");

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/form" }),
  (req, res) => {
    console.log("success");
    res.redirect("/secret");
  }
);

app.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/form", (req, res) => {
  res.render("form");
});

app.get("/secret", loggedIn, (req, res) => {
  res.render("secret");
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

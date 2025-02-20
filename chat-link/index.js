//
var express = require("express");
var bodyParser = require("body-parser");
var axios = require("axios");
var fs = require("fs");
var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let userInfo = {
  username: "",
  password: "",
};

app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  res.set("Access-Control-Allow-Credentials", "true");

  next();
});

// this is the endpoint configured as API URL
app.post("/sso", function (req, res) {
  axios
    .post("http://localhost:3000/api/v1/login", {
      username: userInfo.username,
      password: userInfo.password,
    })
    .then(function (response) {
      if (response.data.status === "success") {
        console.log(response.data, userInfo, "login response");
        res.json({
          loginToken: response.data.data.authToken,
        });
      }
    })
    .catch(function (error) {
      console.log(error, "error");
      res.sendStatus(401);
    });
});

// just render the form for the user authenticate with us
app.get("/login", function (req, res) {
  res.set("Content-Type", "text/html");
  fs.createReadStream("login.html").pipe(res);
});

app.get("/home", function (req, res) {
  userInfo.username = req.query.username;
  userInfo.password = req.query.password;
  res.set("Content-Type", "text/html");
  fs.createReadStream("home.html").pipe(res);
});


app.post("/login", function (req, res) {
  axios
    .post("http://localhost:3000/api/v1/login", {
      username: userInfo.username,
      password: userInfo.password,
    })
    .then(function (response) {
      console.log(response.data, userInfo, "login response");
      if (response.data.status === "success") {
        res.set("Content-Type", "text/html");
        res.send(
          `<script>
                window.parent.postMessage({
                event: 'login-with-token',
                loginToken: '${response.data.data.authToken}'
                }, 'http://localhost:3000'); // rocket.chat's URL
            </script>`
        );
      }
    })
    .catch(function () {
      res.sendStatus(401);
    });
});

app.listen(3030, function () {
  console.log("Example app listening on port 3030!");
});

const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
const fs = require("fs");
const session = require("express-session");
const app = express();

const requestUrl = "http://45.32.110.124:3333/api/v1";
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(
  session({
    secret: "ChatsLinkServerSecret",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
  })
);

app.use((req, res, next) => {
  // 定义允许的源列表
  // 5000 是前端项目的端口
  // 3333 是rock chat 端口
  const allowedOrigins = ["http://45.32.110.124:5000", "http://45.32.110.124:3333"];
  const requestOrigin = req.headers.origin;
  if (allowedOrigins.includes(requestOrigin)) {
    res.set("Access-Control-Allow-Origin", requestOrigin);
    res.set("Access-Control-Allow-Credentials", "true");
    res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  }

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  next();
});

async function login(username, password) {
  try {
    const response = await axios.post(`${requestUrl}/login`, { username, password });
    if (response.data.status === "success") {
      console.log(response.data.data);
      return response.data.data.authToken;
    }
  } catch (error) {
    return null;
  }
}


async function register(username, email, pass, name) {
  try {
    const registerResponse = await axios.post(`${requestUrl}/users.register`, { username, email, pass, name });
    if (registerResponse.data.success) {
      return true;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

app.post("/sso", (req, res) => {
  console.log(req.session.token, '=??');
  if (req.session.token) {
    res.json({
      loginToken: req.session.token,
    });
  } else {
    res.sendStatus(401);
  }
});

app.get("/home", (req, res) => {
  if(req.query.token){
    req.session.token = req.query.token;
  }
  res.set("Content-Type", "text/html");
  fs.createReadStream("home.html").pipe(res);
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  let authToken = await login(username, password);
  if (authToken) {
    req.session.token = authToken; // 将 token 存储在会话中
    res.json({ code: 200, token: authToken });
  } else {
    res.json({ code: 401, message: "登录失败" });
  }
});

app.post("/register", async (req, res) => {
  const { username, password, name, email } = req.body;
  let success = await register(username, email, password, name);
  if (success) {
    // 注册后尝试登录以获取 token
    let authToken = await login(username, password);
    if(authToken){
      req.session.token = authToken; // 将 token 存储在会话中
      res.json({ code: 200, message: "注册成功", token: authToken });
    } else {
      res.json({ code: 401, message: "注册后登录失败" });
    }
  } else {
    res.json({ code: 401, message: "注册失败" });
  }
});

app.get('/login', function (req, res) {
  res.set('Content-Type', 'text/html');
  fs.createReadStream('login.html').pipe(res);
});

app.listen(3030, () => {
  console.log("Example app listening on port 3030!");
});
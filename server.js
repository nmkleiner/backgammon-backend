'use strict';

const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const http = require('http').Server(app);
const userRoute = require('./routes/user.route');
const initSockets = require('./sockets/sockets')

app.use(bodyParser.json());
app.use(cookieParser());
app.use(
  session({
    secret: 'puki muki',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  })
);

app.use(express.static('public'));
userRoute(app);
initSockets(http)

const port = process.env.PORT || 3000
http.listen(port, () => {
  console.log('running...')
});

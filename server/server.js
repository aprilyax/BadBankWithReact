const express         = require('express');
const app             = express();
const cors            = require('cors');
const mongoose        = require("mongoose");
const dashboardRoutes = require("../routes/dashboard");
const verifyToken     = require("../routes/validate-token");
const authRoutes      = require("../routes/auth");

// -------------  Mongodb connection -------------

var db = "mongodb://127.0.0.1:27017/myproject";

// connect to db
mongoose.connect(
    db,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => console.log("connected to db")
);

// -----------------------------------------------

// enable Cross-Origin Resource Sharing
app.use(cors());

// for body parser
app.use(express.json()); 

// -------------- Routes --------------

app.use('/api/user', authRoutes);

// this route is protected with token
app.use("/api/dashboard", verifyToken, dashboardRoutes);

// ----------- Experimenting with routes --------

/* const usersRouter = require("./routes/users");
app.use("/users", usersRouter); */
// -----------------------------------------------

// serve static files from public directory
app.use(express.static('public'));

app.listen(3001, () => console.log("server is running on 3001"));

module.exports = app;

/* 
The server communicates with mongodb as confirmed by testing api with postman.
Express is serving static files to the client - i can see the bootstrap card.
Client is NOT communicating with express.

What is going on?

Do I need to change the const url = `/account/create/${name}/${email}/${password}`; on createaccount.js??
Do I need an app.get ??

app.get('/', function (req, res) {
  res.send('hello world')
})

Question
*/
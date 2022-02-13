const express = require("express");
const cors = require("cors");
// const PORT = process.env.PORT || 5000;
//const dbConfig = require("../server/config/db.config");
// this needs to be moved to and environment variable
var uri = 'mongodb+srv://aprilyax:aprilyax@cluster0.dubn3.mongodb.net/aprildb?retryWrites=true&w=majority' 

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
}; 

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

const db = require("../server/model");
const Role = db.role;

db.mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch((err) => {
    console.error("Connection error", err);
    process.exit();
  });

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Bad Bank application." });
});

// routes
require("../server/routes/auth.routes")(app);
require("../server/routes/user.routes")(app);

// ... other imports 
const path = require('path')

// ... other app.use middleware 
app.use(express.static(path.join(__dirname, "client", "build")))

// Reconfigure express to handle both API calls and serve react app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

// set port, listen for requests
/* app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
}); */
app.listen(process.env.PORT || 3000);

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "USER",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "ADMIN",
      }).save((err) => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
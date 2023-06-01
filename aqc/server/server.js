//https://github.com/bezkoder/node-js-jwt-authentication-postgresql

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: ["http://localhost:4000", "http://localhost:3000"]
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// database
const db = require("./app/models");
const Questions = db.activity

// db.sequelize.sync();
// force: true will drop the table if it already exists
db.sequelize.sync({force: true}).then(() => {
  console.log('Drop and Resync Database with { force: true }');
  initial();
});

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the app" });
});

// routes
require('./app/routes/activity.routes')(app)

// set port, listen for requests
const PORT = process.env.PORT || 4040;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

function initial() {
  Questions.create({
      id: 1, 
      qtype: "aq",
      urltitle: "py_one",
      fulltitle: "Python 1",
      qtext: "This is some question text about python 1, isn't it?",
      metadata: JSON.stringify({ 'answers': [{ 'text': 'Yes', 'correct': true }, { 'text': 'No', 'correct': false }, { 'text': 'Maybe', 'correct': false }, { 'text': 'All of the above', 'correct': false }] })
  })

  Questions.create({
    id: 2, 
    qtype: "aq",
    urltitle: "py_two",
    fulltitle: "Python 2",
    qtext: "This is some question text about python 2, isn't it?",
    metadata: JSON.stringify({ 'answers': [{ 'text': 'Yes', 'correct': true }, { 'text': 'No', 'correct': false }, { 'text': 'Maybe', 'correct': false }, { 'text': 'All of the above', 'correct': false }] })
  })

  Questions.create({
    id: 3, 
    qtype: "aq",
    urltitle: "py_three",
    fulltitle: "Python 3",
    qtext: "This is some question text about python 3, isn't it?",
    metadata: JSON.stringify({ 'answers': [{ 'text': 'Yes', 'correct': true }, { 'text': 'No', 'correct': false }, { 'text': 'Maybe', 'correct': false }, { 'text': 'All of the above', 'correct': false }] })
  })
}
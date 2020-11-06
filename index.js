//require and initialise the server engine
const express = require("express");
const app = express();

//set env file
require("dotenv").config();

//setup views dir
//import built in path module
const path = require("path")

//initialise a view path. full d
app.set('views', path.join(__dirname, 'views'))

//initialise the view templeting engine
app.set('view engine', 'mustache')

//initialize view engine as middleware
app.engine('mustache', require("hogan-middleware").__express)

//custom midlewares
let middle = require("./cModules/middle.js")

/* 
incase template hogan becoms hard to dig: 
https://www.udemy.com/course/intro-to-node-js-express/learn/lecture/12546954?start=313#bookmarks
OR 
let hogan = require("hogan-middleware")
app.engine('mustache', hogan.__express) 
*/

//set static assets 
app.use(express.static(path.join(__dirname, "public")))

//use body parser. Required to be used before sending Form Posts 
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

//set and imoort router for sql links
const main = require("./routes/main")
app.use("/", middle, main);

//set and imoort router for sql links
const settings = require("./routes/settings")
app.use("/settings", settings); 

//set and imoort router for all links
const account = require("./routes/account")
app.use("/account", account);

//questions routes
const question = require("./routes/question")
app.use("/question", question);

//questions routes
const sqlDB = require("./routes/sqlTest")
app.use("/sql", sqlDB);


//mongoose DB
const mongoose = require("mongoose")
mongoose.connect(
    process.env.Server,
    {useNewUrlParser: true, useUnifiedTopology: true},//require by mongo  
).then(() => console.log("Mongo Database Connected..."))

//confirm connection
mongoose.connection.on("error", err => {
    console.log(`Error connecting to Mongo Database: ${err.message}`)
})



//create a port and start server
const port = process.env.Port || 4000;
app.listen(port, () =>{
console.log(`Server Started at port ${port}...`)
})


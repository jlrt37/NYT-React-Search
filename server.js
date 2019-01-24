const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const routes = require("./routes");
const http = require('http');
const cors = require('cors');
const app = express();
const socketIO = require('socket.io', {transports: ['websocket']});
const PORT = process.env.PORT || 3001;
/* 
server.listen(8000); */

app.use(cors());
// Configure body parser for AJAX requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// Serve up static assets
app.use(express.static("client/build"));
// Add routes, both API and view
app.use(routes);

// Set up promises with mongoose
mongoose.Promise = global.Promise;
// Connect to the Mongo DB
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/articlelist",
  {
    useMongoClient: true
  }
);

const server = http.createServer(app);
const io = socketIO(server);

io.on('connection', socket =>{
  console.log('User connected');

  socket.on("saved", data => {
    io.sockets.emit("saved", `Article '${data.title}' has been saved!`);
  });
  socket.on("scraped", data => {
    io.sockets.emit("scraped", `Someone has just scraped article related to '${data.title}'`)
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });  
});
 // Start the API server
server.listen(PORT, () => console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`));


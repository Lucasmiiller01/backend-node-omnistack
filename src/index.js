const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
const cors = require("cors");
const http = require("http");
const app = express();
const { setupWebsocket } = require("./websocket");

const server = http.Server(app);
setupWebsocket(server);
app.use(cors());
app.use(express.json());
app.use(routes);

mongoose.connect(
  "mongodb+srv://lucas:secret123@cluster0-0vu31.mongodb.net/week10?retryWrites=true&w=majority",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
);

server.listen(8080);

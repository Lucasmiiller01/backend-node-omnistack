const socketio = require("socket.io");
const parseStringAsArray = require("./utils/parseStringAsArray");
const calculateDistance = require("./utils/calculateDistance");
let io;
const connections = [];
exports.setupWebsocket = server => {
  io = socketio(server);

  io.on("connection", socket => {
    console.log(socket.id);
    const { latitude, longitude, techs } = socket.handshake.query;
    if (latitude && techs && longitude)
      connections.push({
        id: socket.id,
        coordinates: {
          latitude: Number(latitude),
          longitude: Number(longitude)
        },
        techs: parseStringAsArray(techs)
      });
  });
};

exports.findConnections = (coordinates, techs) => {
  return connections.filter(connection => {
    console.log(coordinates, connection.coordinates, techs, connection.techs);
    return (
      calculateDistance(coordinates, connection.coordinates) < 1000 &&
      connection.techs.some(item => techs.includes(item))
    );
  });
};

exports.sendMessage = (to, message, data) => {
  console.log(to);
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
};

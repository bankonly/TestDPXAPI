const socketIo = require("socket.io");

let io;

exports.InitSocket = (server, channel = "connect", msg = "connected") => {
  io = socketIo(server);
  io.on(channel, () => console.log(msg));
  return io;
};

exports.Io = () => {
  if (!io) throw new Error("uninitialize socket");
  return io;
};

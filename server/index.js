import mongoose from "mongoose";
import { server } from "./app.js";
import { IP_SERVER, PORT, DB_USER, DB_PASSWORD, DB_HOST } from "./constants.js";
import { io } from "./utils/index.js";

const mongoDbUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`;

/*

mongoose.connect(mongoDbUrl, (error) => {
    if(error) throw error;

    server.listen(PORT, () => {
        console.log("###########################");
        console.log("########## API REST #######");
        console.log("###########################");
        console.log(`http://${IP_SERVER}/:${PORT}/api`);
    
        io.sockets.on("connection", (socket) => {
            console.log("NUEVO USUARIO CONECTADO");
    
            socket.on("disconnect", () => {
                console.log("USUARIO DESCONECTADO");
            });
    
            socket.on("subscribe", (room) => {
                socket.join(room);
            });
    
            socket.on("unsubscribe", (room => {
                socket.leave(room);
            }));
        });
    });
});

*/

mongoose.connect(mongoDbUrl);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("MongoDB connected successfully");

  server.listen(PORT, () => {
    console.log("###########################");
    console.log("########## API REST #######");
    console.log("###########################");
    console.log(`http://${IP_SERVER}:${PORT}/api`);

    io.sockets.on("connection", (socket) => {
      console.log("NUEVO USUARIO CONECTADO");

      socket.on("disconnect", () => {
        console.log("USUARIO DESCONECTADO");
      });

      socket.on("subscribe", (room) => {
        socket.join(room);
      });

      socket.on("unsubscribe", (room => {
        socket.leave(room);
      }));
    });
  });
});
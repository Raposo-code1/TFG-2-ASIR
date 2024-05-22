import mongoose from "mongoose";
import { server } from "./app.js";
import { IP_SERVER, PORT, DB_USER, DB_PASSWORD, DB_HOST } from "./constants.js";
import { io } from "./utils/index.js";

const mongoDbUrl = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/`;

// Connect to MongoDB without deprecated options
mongoose.connect(mongoDbUrl)
.then(() => {
    console.log("Connected to MongoDB");

    server.listen(PORT, () => {
        console.log("##################");
        console.log("#### API REST ####");
        console.log("##################");
        console.log(`http://${IP_SERVER}:${PORT}/api`);

        io.sockets.on("connection", (socket) => {
            console.log("NUEVO USUARIO CONECTADO");

            socket.on("disconnect", () => {
                console.log("USUARIO DESCONECTADO");
            });

            socket.on("subscribe", (room) => {
                socket.join(room);
            });

            socket.on("unsubscribe", (room) => {
                socket.leave(room);
            });
        });
    });
})
.catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
});



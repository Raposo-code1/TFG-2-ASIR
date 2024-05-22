import { Chat, ChatMessage } from "../models/index.js";
import { io, getFilePath } from "../utils/index.js";
import { DateTime } from 'luxon';

async function sendText(req, res) {
    const { chat_id, message } = req.body;
    const { user_id } = req.user;

    try {
        const spainDateTime = DateTime.now().setZone('Europe/Madrid');
        const formattedDate = spainDateTime.toFormat('yyyy-MM-dd HH:mm:ss');

        const chat_message = new ChatMessage({
            chat: chat_id,
            user: user_id,
            message,
            type: "TEXT", 
        });

        await chat_message.save();
        const data = await chat_message.populate("user");
        io.to(chat_id).emit("message", data);
        io.to(`${chat_id}_notify`).emit("message_notify", data);
        res.status(201).send("");
    } catch (error) {
        res.status(400).send("Error al enviar el mensaje");
        console.log(error);
    }
}



async function sendImage(req, res) {
    const { chat_id, message } = req.body;
    const { user_id } = req.user;

    try {
        const chat_message = new ChatMessage({
            chat: chat_id,
            user: user_id,
            message: getFilePath(req.files.image),
            type: "IMAGE"
        });

        await chat_message.save();
        const data = await chat_message.populate("user");
        io.to(chat_id).emit("message", data);
        io.to(`${chat_id}_notify`).emit("message_notify", data);
        res.status(201).send("");
    } catch (error) {
        res.status(400).send("Error al enviar el mensaje");
        console.log(error);
    }
}


async function getAll(req, res) {
    const { chat_id } = req.params;

    try {
        const messages = await ChatMessage.find({ chat: chat_id }).sort({ createdAt: 1 }).populate("user");
        const total = await ChatMessage.countDocuments({ chat: chat_id });

        res.status(200).send({ messages, total });
    } catch (error) {
        console.error("Error al obtener los mensajes:", error);
        res.status(500).send("Error del servidor");
    }
}

async function getTotalMessages(req, res) {
    const { chat_id } = req.params;
    try {
        const total = await ChatMessage.countDocuments({ chat: chat_id });
        res.status(200).send(JSON.stringify(total));
    } catch (error) {
        res.status(500).send("Error del servidor");
    }
}

async function getLastMessage(req,res){
    const { chat_id } = req.params;

    try {
        const response = await ChatMessage.findOne({chat: chat_id}).sort({
            createdAt: -1
        });
        res.status(200).send(response || {});
        
    } catch (error) {
       res.status(500).send("Error del servidor");
    }
}


export const ChatMessageController = {
    sendText,
    sendImage,
    getAll,
    getTotalMessages,
    getLastMessage,
};

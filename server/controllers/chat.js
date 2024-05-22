import mongoose from 'mongoose';
const { Types: { ObjectId } } = mongoose;
import { Chat, ChatMessage } from "../models/index.js";


async function create(req, res) {
    const { participant_id_one, participant_id_two } = req.body;

    try {
        // Convertir las cadenas de ID a objetos ObjectId
        const participantOneId = new ObjectId(participant_id_one);
        const participantTwoId = new ObjectId(participant_id_two);

        // Buscar si ya existe un chat entre los participantes
        const existingChat = await Chat.findOne({
            $or: [
                { participant_one: participantOneId, participant_two: participantTwoId },
                { participant_one: participantTwoId, participant_two: participantOneId }
            ]
        });

        // Si ya existe un chat, enviar una respuesta indicando que ya existe
        if (existingChat) {
            return res.status(200).send("Ya tienes un chat con este usuario");
        }

        // Si no existe un chat, crear uno nuevo
        const newChat = new Chat({
            participant_one: participantOneId,
            participant_two: participantTwoId,
        });

        const savedChat = await newChat.save();

        // Enviar la respuesta con el chat recién creado
        res.status(201).json(savedChat);
    } catch (error) {
        // Manejar errores
        console.error("Error al crear el chat:", error);
        res.status(400).send("Error al crear el chat");
    }
}

async function getAll(req, res) {
    try {
        const userData = await req.user;
        console.log("req.user:", userData);
        
        if (!userData || !userData.user_id) {
            throw new Error("Usuario no autenticado o user_id no encontrado");
        }
        
        const { user_id } = userData;
        console.log("user_id:", user_id);

        const chats = await Chat.find({
            $or: [{ participant_one: user_id }, { participant_two: user_id }],
        })
        .populate("participant_one")
        .populate("participant_two")
        .exec();
        
        const arrayChats = [];
        
        for (const chat of chats) {
            const lastMessage = await ChatMessage.findOne({ chat: chat._id }).sort({ createdAt: -1 });
            arrayChats.push({
                ...chat._doc,
                last_message_date: lastMessage?.createdAt || null,
            });
        }

        res.status(200).send(arrayChats);
    } catch (error) {
        res.status(400).send("Error al obtener los chats");
        console.log("Error:", error.message);
    }
}




async function deleteChat(req, res) {
    try {
        const chat_id = req.params.id;
        await Chat.findByIdAndDelete(chat_id);
        res.status(200).send("Chat eliminado");
    } catch (error) {
        res.status(400).send("Error al eliminar el chat");
    }
}

async function getChat(req, res) {
    const chat_id = req.params.id;
    
    try {
        const chat = await Chat.findById(chat_id)
        .populate("participant_one")
        .populate("participant_two");

        if (!chat) {
            return res.status(404).send("El chat no existe");
        }

        res.status(200).send(chat);
    } catch (error) {
        console.error(error);
        res.status(500).send("Error interno del servidor");
    }
}

export const ChatController = {
    create,
    getAll,
    deleteChat,
    getChat,
};

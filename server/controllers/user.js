import { User } from "../models/index.js";
import { getFilePath } from "../utils/index.js";

async function getMe(req, res) {
    const { user_id } = await req.user;

    try{

    const response = await User.findById(user_id).select("-password");
    
    if(!response){
        res.status(400).send("No se ha encontrado el usuario");
    } else {
        res.status(200).send(response);
    }
    } catch(error) {
        res.status(500).send("Error del servidor");
    }
}

async function getUsers(req, res){
    const { user_id } = await req.user;
    const users = await User.find({ _id: { $ne: user_id } }).select("-password");

    try {
        if (!users){
            res.status(400).send("No se han encontrado usuarios");
        } else {
            res.status(200).send(users);
        }
    } catch(error) {
        console.log(error);
        res.status(500).send("Error del servidor");
    }
}

async function getUser(req, res){
    const { id } = req.params;
    try {
        const response = await User.findById(id).select("-password");

        if (!response){
            res.status(400).send("No se ha encontrado el usuario");
        } else {
            res.status(200).send(response);
        }
        
    } catch (error) {
        res.status(500).send("Error del servidor");
        
    }
}

async function updateUser(req, res) {
    const { user_id } = await req.user;
    const userData = req.body;

    if (req.files.avatar) {
        const imagePath = getFilePath(req.files.avatar);
        userData.avatar = imagePath;
    }

    try {
        const userBeforeUpdate = await User.findById(user_id);
        if (!userBeforeUpdate) {
            return res.status(400).send("Usuario no encontrado");
        }

        const response = await User.findByIdAndUpdate(user_id, userData);
        if (!response) {
            return res.status(400).send("Error al actualizar los datos del usuario");
        }

        // Comprobamos si los datos fueron actualizados
        const userAfterUpdate = await User.findById(user_id).select("-password");
        if (!userAfterUpdate) {
            return res.status(400).send("Usuario no encontrado después de la actualización");
        }

        res.status(200).send(userAfterUpdate);
    } catch (error) {
        res.status(500).send("Error del servidor");
    }
}




export const UserController = {
    getMe,
    getUsers,
    getUser,
    updateUser,
};

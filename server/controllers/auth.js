import bcrypt from "bcryptjs";
import { User } from "../models/index.js";
import { jwt } from "../utils/jwt.js";

async function register(req, res) {
    const { email, password } = req.body;

    try {
        const user = new User({
            email: email.toLowerCase(),
        });

        const salt = bcrypt.genSaltSync(10);
        const hashPassword = bcrypt.hashSync(password, salt);
        user.password = hashPassword;

        const userStorage = await user.save();
        res.status(201).json({ userStorage });
        console.log("Usuario registrado:", userStorage);
    } catch (error) {
        console.error("Error al registrar el usuario:", error);
        res.status(400).json({ msg: "Error al registrar el usuario" });
    }
}

async function login(req, res) {
    const { email, password } = req.body;

    const emailLowerCase = email.toLowerCase();

    try {
        const userStorage = await User.findOne({ email: emailLowerCase });

        if (!userStorage) {
            console.log("Usuario no encontrado:", email);
            return res.status(400).json({ msg: "Usuario no encontrado" });
        }

        console.log("Usuario encontrado:", userStorage);

        const check = await bcrypt.compare(password, userStorage.password);

        if (!check) {
            console.log("Contraseña incorrecta para el usuario:", email);
            return res.status(400).json({ msg: "Contraseña incorrecta" });
        }

        const accessToken = await jwt.createAccessToken(userStorage);
        const refreshToken = await jwt.createRefreshToken(userStorage);
        res.status(200).json({ access: accessToken, refresh: refreshToken });
    } catch (error) {
        console.error("Error al iniciar sesión:", error);
        res.status(500).json({ msg: "Error del servidor" });
    }
}

async function refreshAccessToken(req, res) {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.status(400).send({ msg: "Token requerido" });
    
    try {
        const decodedToken = await jwt.decoded(refreshToken);

        if (!decodedToken || !decodedToken.user_id) {
            console.log("No se pudo obtener el ID de usuario del token de actualización.");
            return res.status(400).send({ msg: "Token de actualización inválido" });
        }

        const user_id = decodedToken.user_id;

        const userStorage = await User.findById(user_id);

        if (!userStorage) {
            console.log("Usuario no encontrado para el ID proporcionado:", user_id);
            return res.status(400).send({ msg: "Usuario no encontrado" });
        }

        const accessToken = await jwt.createAccessToken(userStorage);
        res.status(200).json({ accessToken });
    } catch (error) {
        console.error("Error al refrescar el token de acceso:", error);
        res.status(500).json({ msg: "Error del servidor" });
    }
}

export const AuthController = {
    register,
    login,
    refreshAccessToken,
};





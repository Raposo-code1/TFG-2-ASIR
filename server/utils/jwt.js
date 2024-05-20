import jsonwebtoken from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../constants.js";

async function createAccessToken(user) {
    try {
        if (!user) {
            throw new Error('Usuario inválido');
        }

        const expToken = new Date();
        expToken.setHours(expToken.getHours() + 24);

        const payload = {
            token_type: "access",
            user_id: user._id.toString(), // Convertir ObjectId a string si es necesario
            iat: Date.now(),
            exp: expToken.getTime(),
        };

        const accessToken = jsonwebtoken.sign(payload, JWT_SECRET_KEY);
        console.log("Token de acceso generado:", accessToken);

        return accessToken;
    } catch (error) {
        console.error("Error al crear el token de acceso:", error);
        throw error;
    }
}

async function createRefreshToken(user){
    const expToken = new Date();
    expToken.setMonth(expToken.getMonth() + 1);

    const payload = {
        token_type: "refresh",
        user_id: user._id.toString(), // Convertir ObjectId a string si es necesario
        iat: Date.now(),
        exp: expToken.getTime(),
    }

    return jsonwebtoken.sign(payload, JWT_SECRET_KEY);
}

async function decoded(token) {
    try {
        return jsonwebtoken.verify(token, JWT_SECRET_KEY);
    } catch (error) {
        console.error("Error al decodificar el token:", error);
        throw error;
    }
}

async function hasExpiredToken(token) {
    try {
        const { exp } = await decoded(token);
        const currentDate = new Date().getTime();

        return exp <= currentDate;
    } catch (error) {
        console.error("Error al verificar si el token ha expirado:", error);
        throw error;
    }
}

export const jwt = {
    createAccessToken,
    createRefreshToken,
    decoded,
    hasExpiredToken,
};


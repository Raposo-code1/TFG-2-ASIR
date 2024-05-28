import { ENV } from '../Utils';

export class Chat {
    async create(token, participantIdOne, participantIdTwo) {
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CHAT}`;
            const params = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    participant_id_one: participantIdOne,
                    participant_id_two: participantIdTwo,
                }),
            };
            const response = await fetch(url, params);
            const contentType = response.headers.get("content-type");

            let result;
            if (contentType && contentType.indexOf("application/json") !== -1) {
                result = await response.json();
            } else {
                result = await response.text();
            }

            if (response.status !== 200 && response.status !== 201) {
                throw new Error(result.message || result || "Error desconocido");
            }

            return result;
        } catch (error) {
            console.error("Error en create:", error);
            throw error;
        }
    }

    async getAll(token) {
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CHAT}`;
            const params = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await fetch(url, params);
            const contentType = response.headers.get("content-type");

            let result;
            if (contentType && contentType.indexOf("application/json") !== -1) {
                result = await response.json();
            } else {
                result = await response.text();
            }

            if (response.status !== 200) {
                throw new Error(result.message || result || "Error desconocido");
            }

            return result;
        } catch (error) {
            console.error("Error en getAll:", error);
            throw error;
        }
    }

    async remove(token, chatId) {
        try {
            const url = `${ENV.API_URL}${ENV.ENDPOINTS.CHAT}/${chatId}`;
            const params = {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await fetch(url, params);
            const contentType = response.headers.get("content-type");

            let result;
            if (contentType && contentType.indexOf("application/json") !== -1) {
                result = await response.json();
            } else {
                result = await response.text();
            }

            if (response.status !== 200) {
                throw new Error(result.message || result || "Error desconocido");
            }

            return result;
        } catch (error) {
            console.error("Error en remove:", error);
            throw error;
        }
    }

    async obtain(token, chatId) {
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.CHAT}/${chatId}`;
            const params = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await fetch(url, params);
            const result = await response.json();

            if (response.status !== 200) throw result;
            
            return result;
        } catch (error) {
            throw error;
        }
    }
}

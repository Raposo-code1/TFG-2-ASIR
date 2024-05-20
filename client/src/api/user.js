import { ENV } from "../Utils";

export class User {
    async getMe(accessToken) {
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ME}`;
            const params = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };

            const response = await fetch(url, params);
            const result = await response.json();

            if(response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }

    async updateUser(accessToken,userData) {
        try {
            const data = userData;

            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                formData.append(key, data[key]);
            });

            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.ME}`;

            const params = {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
                body: formData,
            };

            const response = await fetch(url, params);
            const result = await response.json();

            if(response.status !== 200) throw result;
            
            return result; 
        } catch (error) {
            throw error;
        }
    }

    async getAll(accessToken) {
        try {
            const url = `${ENV.API_URL}/${ENV.ENDPOINTS.USER}`;
            const params = {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            };

            const response = await fetch(url, params);
            const result  = await response.json();

            if(response.status !== 200) throw result;

            return result;
        } catch (error) {
            throw error;
        }
    }
}

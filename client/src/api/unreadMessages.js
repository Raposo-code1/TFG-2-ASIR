import AsyncStorage from "@react-native-async-storage/async-storage";

export class UnreadMessages{
    async getTotalReadMessages(chatId){
        const response = await AsyncStorage.getItem(`${chatId}_read`);
        return Number(response);
    }
}
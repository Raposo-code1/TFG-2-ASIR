import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from './Item.styles';
import { Avatar } from "native-base";
import { useAuth } from "../../../../hooks";
import { ENV, socket, screens } from "../../../../Utils";
import { ChatMessage, UnreadMessages, Chat } from "../../../../api";
import { DateTime } from "luxon";
import { size, isEmpty } from "lodash";
import { AlertConfirm } from "../../../../components/Shared";

const ChatController= new Chat();
const ChatMessageController = new ChatMessage();
const UnreadMessagesController = new UnreadMessages();

export function Item(props) {
    const { chat, onReload, upTopChat } = props;
    const { user, accessToken } = useAuth();
    const navigation = useNavigation();
    const { participant_one, participant_two } = chat || {};
    const [lastMessage, setLastMessage] = useState(null);
    const [totalUnreadMessages, setTotalUnreadMessages] = useState(0);
    const [showDelete, setShowDelete] = useState(false);  
    useEffect(() => {
        (async () => {
            try {
              const totalMessages = await ChatMessageController.getTotal(accessToken, chat._id);
              const totalReadMessages = await UnreadMessagesController.getTotalReadMessages(chat._id);
              setTotalUnreadMessages(totalMessages - totalReadMessages);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [chat._id]);

    useEffect(() => {
        (async () => {
            try {
                const response = await ChatMessageController.getLastMessage(accessToken, chat._id);
                if (!isEmpty(response)) setLastMessage(response);
            } catch (error) {
                console.error(error);
            }
        })();
    }, [chat._id]);

    const userChat = user && (user._id === participant_one._id ? participant_two : participant_one);

    const opencloseDelete = () => setShowDelete(prevState => !prevState)

    const openChat = () => {
        console.log("Abrir chat -->", chat._id);
        setTotalUnreadMessages(0);
        navigation.navigate(screens.global.chatScreen, { chatId: chat._id });
        
    };

    const deleteChat = async () =>{
        try {
            await ChatController.remove(accessToken, chat._id);
            opencloseDelete();
            onReload();
        } catch (error) {
            console.error(error)
        }
    }

    // Función para obtener la hora dos horas más tarde que lastMessage.createdAt
    const getAdjustedTime = () => {
        if (lastMessage) {
            const messageDateTime = DateTime.fromISO(lastMessage.createdAt);
            const adjustedTime = messageDateTime.plus({ hours: 2 });
            return adjustedTime.toFormat("HH:mm");
        }
        return "";
    };


    useEffect(() => {
      socket.emit("subscribe", `${chat._id}_notify`);
      socket.on("message_notify", newMessage);
    }, []);

    const newMessage = async (newMessage) => {
        if(newMessage.chat === chat._id) {
            if(newMessage.user._id !== user._id) {
                upTopChat(newMessage.chat);
                setLastMessage(newMessage);

                const activeChatId = await AsyncStorage.getItem(ENV.ACTIVE_CHAT_ID);
                if(activeChatId !== newMessage.chat) {
                    setTotalUnreadMessages((prevState) => prevState + 1);
                }
            }
        }
    };
    

    return (
        <>
            <TouchableOpacity style={styles.content} onPress={openChat} onLongPress={opencloseDelete}>
                <Avatar
                    bg="cyan.500"
                    size="lg"
                    marginRight={3}
                    style={styles.avatar}
                    source={{ uri: userChat && userChat.avatar && `${ENV.BASE_PATH}/${userChat.avatar}` }}
                >
                    {userChat && userChat.email.substring(0, 2).toUpperCase()}
                </Avatar>
                <View style={styles.infoContent}>
                    <View style={styles.info}>
                        <Text style={styles.identity}>
                            {userChat.firstName || userChat.lastName ? `${userChat.firstName || ""} ${userChat.lastName || ""}` : userChat.email}
                        </Text>
                        <Text style={styles.message} numberOfLines={2}>
                            {lastMessage?.message || ""}
                        </Text>
                    </View>

                    <View style={styles.notify}>
                        {lastMessage && (
                            <Text style={styles.time}>
                                {getAdjustedTime()}
                            </Text>
                        )}

                        {totalUnreadMessages > 0 && (
                            <View style={styles.totalUnreadContent}>
                                <Text style={styles.totalUnread}>
                                    {totalUnreadMessages < 99 ? totalUnreadMessages : "99+"}
                                </Text>
                            </View>
                        )}
                    </View>
                </View>
            </TouchableOpacity>

            <AlertConfirm
            show={showDelete}
            onClose={opencloseDelete}
            textConfirm="Eliminar"
            onConfirm={deleteChat}
            title="Eliminar Chat"
            message={`Estas seguro de que quieres eliminar el chat con ${userChat.email}`}
            isDanger

            />
        </>
    );
}
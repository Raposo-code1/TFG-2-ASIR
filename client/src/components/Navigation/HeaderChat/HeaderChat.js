import { useState, useEffect } from "react";
import { View, SafeAreaView, Text, Pressable } from "react-native";
import { IconButton, ChevronLeftIcon, DeleteIcon, Avatar } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { Chat } from "../../../api";
import { useAuth } from "../../../hooks";
import { styles } from "./HeaderChat.styles";

const chatController = new Chat();

export function HeaderChat(props) {
  const { chatId } = props;
  const [userChat, setUserChat] = useState(null);
  const navigation = useNavigation();
  const {accessToken, user} = useAuth();

  useEffect(() => {
    (async () => {
      try {
        const response = await chatController.obtain(accessToken, chatId);
        const otherUser =
        user._id !== response.participant_one._id
        ? response.participant_one
        : response.participant_two;
        setUserChat(otherUser);
      } catch (error) {
        console.error(error);
      }
    })()
  }, [chatId])
  

  return (
    <View>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
            <View style={styles.info}>
                <IconButton icon={<ChevronLeftIcon />}
                padding={0}
                onPress={navigation.goBack}
                />
            </View>
            <View>
              <IconButton icon={<DeleteIcon />} padding={0} />
            </View>
        </View>
        </SafeAreaView>
    </View>
  )
}
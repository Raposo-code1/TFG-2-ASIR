import { useState, useEffect, useCallback } from 'react';
import { View, Text } from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { IconButton, AddIcon } from "native-base";
import { Chat } from "../../api";
import { useAuth } from "../../hooks";
import { screens } from "../../Utils";
import { LoadingScreen } from "../../components/Shared";

const chatController = new Chat();

export function ChatScreen() {
  const { accessToken } = useAuth();
  const navigation = useNavigation();
  const [chats, setChats] = useState(null);
  const [chatsResult, setChatsResult] = useState(null);
  

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
       <IconButton
        icon={<AddIcon />}
        padding={0}
        onPress={() =>
          navigation.navigate(screens.tab.chats.createChatScreen)
        }
      />  
      ),
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      (async () => {
        try {
          const response = await chatController.getAll(accessToken);
          setChats(response);
          setChatsResult(response);
        } catch (error) {
          console.error(error);
        }
      })()
    }, [])
  );

  if(!chatsResult) return <LoadingScreen />;
  
  
  return (
    <View>
      <Text>ChatsScreen</Text>
    </View>
  )
}
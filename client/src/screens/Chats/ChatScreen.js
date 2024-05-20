import { useEffect } from 'react';
import { View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { IconButton, AddIcon } from "native-base";
import { screens } from "../../Utils";

export function ChatScreen() {
  const navigation = useNavigation();

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
  
  return (
    <View>
      <Text>ChatScreen</Text>
    </View>
  )
}
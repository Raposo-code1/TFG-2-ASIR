import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { ChatScreen, CreateChatScreen } from "../../screens/Chats";
import { screens } from "../../Utils";
import { Styles } from "../Styles.styles";
import { Stack } from "native-base";

const stack = createNativeStackNavigator();

export function ChatsNavigation() {
  return (
    <Stack.Navigator screenOptions={{
        ...Styles.stackNavigationStyles,
    }}
    >
        <Stack.Screen
            name={screen.tab.chats.chatScreen}
            component={ChatScreen}
            options={{ title: "Chats"}}
        />
        <Stack.Screen
            name={screen.tab.chats.CreateChatScreen}
            component={CreateChatScreen}
            options={{
                title: "Nuevo chat",
                presentation: "model",
                ...Styles.modalStyles,
                
            }}
        />
    </Stack.Navigator>
  );
}
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ChatScreen, CreateChatScreen } from "../../screens/Chats";
import { screens } from "../../Utils";
import { Styles } from "../Styles.styles";

const Stack = createNativeStackNavigator();

export function ChatsNavigation() {
  return (
    <Stack.Navigator screenOptions={{
        ...Styles.stackNavigationStyles,
    }}
    >
        <Stack.Screen
            name={screens.tab.chats.chatScreen}
            component={ChatScreen}
            options={{ title: "Chats"}}
        />
        <Stack.Screen
            name={screens.tab.chats.createChatScreen}
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
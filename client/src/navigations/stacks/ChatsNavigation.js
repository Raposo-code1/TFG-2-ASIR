import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ChatsScreen, CreateChatScreen } from "../../screens/Chats";
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
            name={screens.tab.chats.chatsScreen}
            component={ChatsScreen}
            options={{ title: "Chats"}}
        />
        <Stack.Screen
            name={screens.tab.chats.createChatScreen}
            component={CreateChatScreen}
            options={{
                title: "Nuevo chat",
                presentation: "modal",
                ...Styles.modalStyles,
                
            }}
        />
    </Stack.Navigator>
  );
}
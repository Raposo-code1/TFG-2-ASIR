import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { GroupsScreen, CreateGroupScreen, GroupScreen } from "../../screens/Groups";
import { screens } from "../../Utils";
import { Styles } from "../Styles.styles";

const Stack = createNativeStackNavigator();

export function GroupsNavigation() {
  return (
    <Stack.Navigator screenOptions={{ ...Styles.stackNavigationStyles}}>
        <Stack.Screen 
            name={screens.tab.groups.groupsScreen}
            component={GroupScreen}
            options={{ title: "Grupos"}}
        />
        <Stack.Screen 
            name={screens.tab.groups.createGroupScreen}
            component={CreateGroupScreen}
            options={{ title: "Nuevo Grupo",
            presentation: "modal",
            ...Styles.modalStyles,

        }}
        />
    </Stack.Navigator>
  )
}
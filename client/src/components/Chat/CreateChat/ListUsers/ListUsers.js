import { ScrollView, View, Text, Touchable, TouchableOpacity } from 'react-native';
import { Avatar } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { map } from "lodash";
import { ENV } from "../../../../Utils";
import { styles } from "./ListUsers.styles";

export function ListUser(props) {
  const { users } = props;

  const createChat = (user) => {
    console.log("Crear chat con", user.email)
  }

  return (
    <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
      {map(users, (user) => (
        <TouchableOpacity
          key={user._id}
          style={styles.item}
          onPress={() => createChat(user)}
          >
          <Avatar bg="cyan.500" marginRight={3} source={{ uri: user.avatar && `${ENV.BASE_PATH}/${user.avatar}` }}>
            {user.email.substring(0, 2).toUpperCase()}
          </Avatar>

          <View>
            <Text style={styles.name}>
              {user.firstname || user.lastname ? `${user.firstname || ""} ${user.lastname || ""}`
              : "..."}
            </Text>
            <Text style={styles.email}>{user.email}</Text>
          </View>

        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}
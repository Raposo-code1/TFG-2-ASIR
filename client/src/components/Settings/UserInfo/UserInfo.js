import { View, Text } from "react-native";
import { Avatar } from "native-base";
import { ENV } from "../../../Utils";
import { styles } from "./UserInfo.styles";

export function UserInfo(props) {
    const { user } = props;

  return (
    <View style={styles.content}>
      <Avatar 
        bg="cyan.500"
        marginRight={3}
        size="xl"
        style={styles.avatar}
        source={{  uri: user.avatar && `${ENV.BASE_PATH}/${user.avatar}`}}
      >
        {user.email.substring(0, 2).toUpperCase()}
        </Avatar>

        {user.firstname || user.lastname ? (
            <Text style={styles.identity}>
                {`${user.firstname || ""} ${user.lastname || ""}`}
            </Text>
        ) : null}

        <Text style={styles.email}>{user.email}</Text>
    </View>
  )
}
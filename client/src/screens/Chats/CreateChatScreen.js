import {   useState, useEffect } from "react";
import { View } from "react-native";
import { IconButton, CloseIcon } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { User } from "../../api/user";
import { useAuth} from "../../hooks/useAuth";
import { CreateChat } from "../../components/Chat";

const userController = new User();

export function CreateChatScreen() {
  const navigation = useNavigation();
  const { accessToken } = useAuth();
  const [users, setUsers] = useState(null);
  const [usersResult, setUsersResult] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton icon={<CloseIcon />}
          padding={0}
          onPress={navigation.goBack}
        />
      ),
    })
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await userController.getAll(accessToken);
        setUsers(response);
        setUsersResult(response);
      } catch (error) {
        console.error(error);
      }
    })()
  }, [])
  
  
  return (
    <View>
      <CreateChat.ListUser users={usersResult} />
    </View>
  )
}
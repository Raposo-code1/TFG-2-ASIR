import { styles } from './ListChat.styles';
import { Text, View, ScrollView } from 'react-native';
import { map, size } from "lodash";
import { Item } from "./Item"

export function ListChat(props) {
  const { chats, onReload, upTopChat } = props;
  
  return (
    <ScrollView alwaysBounceVertical={false}>
      <View style={styles.content}>
        {!size(chats) ? (
          <Text style={styles.noChats}>
            No tienes ningún chat, dale al (+) y empieza una nueva conversación
          </Text>
        ) : null}

        {map(chats, (chat, index) => (
            <Item
              KEY={chat._id}
              chat={chat}
              onReload={onReload}
              upTopChat={upTopChat}
            />
        ))}
      </View>
    </ScrollView>
  );
}


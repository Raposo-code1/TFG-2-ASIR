import { View, SafeAreaView, Text, Pressable } from "react-native";
import { IconButton, ChevronLeftIcon, DeleteIcon, Avatar } from "native-base";
import { styles } from "./HeaderChat.styles"

export function HeaderChat() {
  return (
    <View>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
            <View style={styles.info}>
                <IconButton icon={<ChevronLeftIcon />}
                padding={0}
                onPress={() => {}}/>
            </View>
        </View>
        </SafeAreaView>
    </View>
  )
}
import React from "react";
import { View, Text } from "react-native";
import { useRoute } from "@react-navigation/native";
import { HeaderChat } from "../../components/Navigation";

export function ChatScreen() {
  const { params: { chatId },
 } = useRoute();
  console.log(chatId); 
  return (
    <>
    <HeaderChat chatId={chatId} />

    <View>
      <Text style={{ color: "#fff" }}>ChatScreen</Text>
    </View>
    </>
  );
}
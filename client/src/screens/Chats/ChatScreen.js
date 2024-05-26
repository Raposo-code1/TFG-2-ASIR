import React from "react";
import { View, Text } from "react-native";
import { HeaderChat } from "../../components/Navigation";

export function ChatScreen() {
  return (
    <>
    <HeaderChat />

    <View>
      <Text style={{ color: "#fff" }}>ChatScreen</Text>
    </View>
    </>
  )
}
import React from "react";
import { Text, View } from "react-native";

interface Props {}

export const Home: React.FC<Props> = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Text>home</Text>
    </View>
  );
};

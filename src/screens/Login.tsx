import React from "react";
import { Text, View, Button } from "react-native";
import { NavigationSwitchScreenProps } from "react-navigation";

export const Login: React.FC<NavigationSwitchScreenProps> = ({
  navigation
}) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Button
        title="login user"
        onPress={() => {
          navigation.navigate("App");
        }}
      />
    </View>
  );
};

import React, { useEffect } from "react";
import { View, Text, Button } from "react-native";
import { NavigationSwitchScreenProps } from "react-navigation";

interface Props {}

export const AuthLoading: React.FC<Props & NavigationSwitchScreenProps> = ({
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
        title="go to login"
        onPress={() => {
          navigation.navigate("Auth");
        }}
      />
    </View>
  );
};

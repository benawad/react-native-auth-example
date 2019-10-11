import React, { useContext } from "react";
import { Text, View, AsyncStorage } from "react-native";
import { UserContext } from "../UserContext";
import { Button } from "react-native-paper";
import { NavigationStackScreenProps } from "react-navigation-stack";

interface Props {}

export const Home: React.FC<NavigationStackScreenProps> = ({ navigation }) => {
  const { authPayload, logout } = useContext(UserContext);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Text>{authPayload && JSON.stringify(authPayload.user)}</Text>
    </View>
  );
};

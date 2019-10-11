import React, { useEffect, useContext } from "react";
import { View, Text, Button, AsyncStorage } from "react-native";
import { NavigationSwitchScreenProps } from "react-navigation";
import { ActivityIndicator } from "react-native-paper";
import { ASYNCSTORAGE_JWT } from "../constants";
import { UserContext } from "../UserContext";
import decode from "jwt-decode";

interface Props {}

export const AuthLoading: React.FC<Props & NavigationSwitchScreenProps> = ({
  navigation
}) => {
  const { setAuthPayload } = useContext(UserContext);

  useEffect(() => {
    AsyncStorage.getItem(ASYNCSTORAGE_JWT)
      .then(token => {
        try {
          const { id, username } = decode(token);
          setAuthPayload({
            token,
            user: {
              id,
              username
            }
          });
          navigation.navigate("App");
        } catch {
          navigation.navigate("Auth");
        }
      })
      .catch(() => {
        navigation.navigate("Auth");
      });
  }, []);

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <ActivityIndicator size="large" />
    </View>
  );
};

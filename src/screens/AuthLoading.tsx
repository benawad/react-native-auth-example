import React, { useEffect, useContext } from "react";
import { View, Text, Button } from "react-native";
import SecureStore from "expo-secure-store";
import { NavigationSwitchScreenProps } from "react-navigation";
import { ActivityIndicator } from "react-native-paper";
import { SECURESTORAGE_JWT } from "../constants";
import { UserContext } from "../UserContext";
import decode from "jwt-decode";

interface Props {}

export const AuthLoading: React.FC<Props & NavigationSwitchScreenProps> = ({
  navigation
}) => {
  const { setAuthPayload } = useContext(UserContext);

  useEffect(() => {
    SecureStore.getItemAsync(SECURESTORAGE_JWT)
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

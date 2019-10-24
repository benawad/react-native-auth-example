import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import SecureStore from "expo-secure-store";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Provider as PaperProvider } from "react-native-paper";
import { Home } from "./screens/Home";
import { Login } from "./screens/Login";
import { Register } from "./screens/Register";
import { AuthLoading } from "./screens/AuthLoading";
import { UserContext, AuthPayload } from "./UserContext";
import { SECURESTORAGE_JWT } from "./constants";
import decode from "jwt-decode";

const AppStack = createStackNavigator({ Home });
const AuthStack = createSwitchNavigator(
  { Login, Register },
  {
    initialRouteName: "Register"
  }
);

const AppContainer = createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoading,
      App: AppStack,
      Auth: AuthStack
    },
    {
      initialRouteName: "AuthLoading"
    }
  )
);

interface Props {}

const persistenceKey = "persistenceKey1";
const persistNavigationState = async navState => {
  try {
    await SecureStore.setItemAsync(persistenceKey, JSON.stringify(navState));
  } catch (err) {
    // handle the error according to your needs
  }
};
const loadNavigationState = async () => {
  const jsonString = await SecureStore.getItemAsync(persistenceKey);
  return JSON.parse(jsonString);
};

function getPersistenceFunctions() {
  return __DEV__
    ? {
        persistNavigationState,
        loadNavigationState
      }
    : undefined;
}

export const Routes: React.FC<Props> = () => {
  const [authPayload, setAuthPayload] = useState<AuthPayload | null>(null);

  useEffect(() => {
    if (__DEV__) {
      SecureStore.getItemAsync(SECURESTORAGE_JWT).then(token => {
        try {
          const { id, username } = decode(token);
          setAuthPayload({
            token,
            user: {
              id,
              username
            }
          });
        } catch {}
      });
    }
  }, []);

  return (
    <PaperProvider>
      <UserContext.Provider
        value={{
          authPayload,
          setAuthPayload: (payload: AuthPayload) => {
            SecureStore.setItemAsync(SECURESTORAGE_JWT, payload.token);
            setAuthPayload(payload);
          },
          logout: async () => {
            await SecureStore.deleteItemAsync(SECURESTORAGE_JWT);
            setAuthPayload(null);
          }
        }}
      >
        <AppContainer {...getPersistenceFunctions()} />
      </UserContext.Provider>
    </PaperProvider>
  );
};

import React, { useState, useEffect } from "react";
import { View, Text, AsyncStorage } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Provider as PaperProvider } from "react-native-paper";
import { Home } from "./screens/Home";
import { Login } from "./screens/Login";
import { Register } from "./screens/Register";
import { AuthLoading } from "./screens/AuthLoading";
import { UserContext, AuthPayload } from "./UserContext";
import { ASYNCSTORAGE_JWT } from "./constants";
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
    await AsyncStorage.setItem(persistenceKey, JSON.stringify(navState));
  } catch (err) {
    // handle the error according to your needs
  }
};
const loadNavigationState = async () => {
  const jsonString = await AsyncStorage.getItem(persistenceKey);
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
      AsyncStorage.getItem(ASYNCSTORAGE_JWT).then(token => {
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
            AsyncStorage.setItem(ASYNCSTORAGE_JWT, payload.token);
            setAuthPayload(payload);
          },
          logout: () => {
            AsyncStorage.clear();
            setAuthPayload(null);
          }
        }}
      >
        <AppContainer {...getPersistenceFunctions()} />
      </UserContext.Provider>
    </PaperProvider>
  );
};

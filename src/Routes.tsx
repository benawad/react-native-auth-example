import React from "react";
import { View, Text } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Home } from "./screens/Home";
import { Login } from "./screens/Login";
import { AuthLoading } from "./screens/AuthLoading";

const AppStack = createStackNavigator({ Home });
const AuthStack = createStackNavigator({ Login });

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

export const Routes: React.FC<Props> = () => {
  return <AppContainer />;
};

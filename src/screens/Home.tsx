import React, { useContext } from "react";
import { Text, View, AsyncStorage, SafeAreaView, FlatList } from "react-native";
import { UserContext } from "../UserContext";
import { Button } from "react-native-paper";
import { NavigationStackScreenProps } from "react-navigation-stack";
import { useFetch } from "../utils/useFetch";

interface Props {}

export const Home: React.FC<NavigationStackScreenProps> = ({ navigation }) => {
  const { authPayload, logout } = useContext(UserContext);
  const { data, loading } = useFetch("/articles");

  return (
    <SafeAreaView
      style={{
        flex: 1
      }}
    >
      <FlatList
        data={data || []}
        renderItem={({ item }) => {
          return <Text>hi</Text>;
        }}
        keyExtractor={item => item.slug || ""}
      />
    </SafeAreaView>
  );
};

import React, { useState } from "react";
import { View, Button } from "react-native";
import { NavigationSwitchScreenProps } from "react-navigation";
import { TextInput } from "react-native-paper";

export const Register: React.FC<NavigationSwitchScreenProps> = ({
  navigation
}) => {
  const [email, setEmail] = useState("");

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <View style={{ height: 50, width: "100%" }}>
        <TextInput
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
        />
      </View>
    </View>
  );
};

import React, { useState, useContext } from "react";
import { Text, View, KeyboardAvoidingView } from "react-native";
import { NavigationSwitchScreenProps, SafeAreaView } from "react-navigation";
import { Headline, Button, TextInput } from "react-native-paper";
import { useMutation } from "../utils/useMutation";
import { UserContext } from "../UserContext";

export const Login: React.FC<NavigationSwitchScreenProps> = ({
  navigation
}) => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const [loading, setLoading] = useState(false);
  const mutate = useMutation();
  const { setAuthPayload } = useContext(UserContext);

  return (
    <SafeAreaView
      style={{
        flex: 1
      }}
    >
      <KeyboardAvoidingView
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 16
        }}
        behavior="padding"
        enabled={true}
      >
        <Headline style={{ marginBottom: 16 }}>Login</Headline>
        {errorText ? <Text style={{ color: "red" }}>{errorText}</Text> : null}
        <TextInput
          style={{ height: 50, width: "100%", marginBottom: 16 }}
          label="Email"
          value={email}
          onChangeText={text => setEmail(text)}
          autoCapitalize="none"
        />
        <TextInput
          style={{ height: 50, width: "100%", marginBottom: 16 }}
          label="Password"
          value={password}
          onChangeText={text => setPassword(text)}
          autoCapitalize="none"
          secureTextEntry
        />
        <Button
          mode="contained"
          onPress={async () => {
            setLoading(true);
            try {
              const { errors, user } = await mutate({
                path: "/users/login",
                body: {
                  user: {
                    email,
                    password
                  }
                }
              });
              if (errors) {
                let errorText = "";
                Object.keys(errors).forEach(k => {
                  errors[k].forEach(m => {
                    errorText += `${k}: ${m}\n`;
                  });
                });
                setErrorText(errorText);
                setLoading(false);
              } else {
                setAuthPayload({
                  token: user.token,
                  user: {
                    id: user.id,
                    username: user.username
                  }
                });
                navigation.navigate("App");
              }
            } catch (err) {
              console.log(err);
              setLoading(false);
            }
          }}
          loading={loading}
          disabled={loading}
        >
          Login
        </Button>
        <Button
          style={{ marginTop: 32 }}
          onPress={() => navigation.navigate("Register")}
        >
          or Register
        </Button>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

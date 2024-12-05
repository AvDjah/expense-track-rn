import { AppStateContext } from "@/app/_layout";
import { SetValueForStore } from "../store/store";
import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Text,
} from "react-native";
import { router } from "expo-router";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    height: 10,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  inputActive: {
    borderColor: "darkgreen",
  },
});

const LoginBox = () => {
  const appStateContext = useContext(AppStateContext);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameActive, setUsernameActive] = useState(false);
  const [passwordActive, setPasswordActive] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await fetch("http://10.0.2.2:8080/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Login failed:", errorData);
        // Handle error appropriately, e.g., display an error message to the user.
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Login successful:", data);
      // Handle successful login, e.g., navigate to another screen.
      const token = data.token;
      SetValueForStore("user_token", token);

      router.back();
    } catch (error) {
      console.error("Login error:", error);
      // Handle errors appropriately, e.g., display an error message
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TextInput
          style={[styles.input, usernameActive ? styles.inputActive : null]}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          onFocus={() => setUsernameActive(true)}
          onBlur={() => setUsernameActive(false)}
        />
        <TextInput
          style={[styles.input, passwordActive ? styles.inputActive : null]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
          onFocus={() => setPasswordActive(true)}
          onBlur={() => setPasswordActive(false)}
        />
        <Pressable
          style={{
            backgroundColor: "darkgreen",
            width: 100,
            alignSelf: "center",
            padding: 8,
            borderRadius: 10,
          }}
          onPress={handleLogin}
        >
          <Text style={{ color: "white", textAlign: "center" }}>Login</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default LoginBox;

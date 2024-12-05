import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Text,
} from "react-native";

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameActive, setUsernameActive] = useState(false);
  const [passwordActive, setPasswordActive] = useState(false);

  const handleLogin = () => {
    // Handle login logic here.  Replace this with your actual login functionality.
    console.log("Username:", username);
    console.log("Password:", password);
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

import LoginBox from "@/components/login/loginForm";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
  return (
    <SafeAreaView
      style={{
        height: "100%",
        backgroundColor: "#E9F5E1",
        flexDirection: "column",
        paddingTop: 100,
      }}
    >
      <View style={styles.header}>
        <Text style={styles.headerText}>Login</Text>
      </View>
      <View style={styles.loginContainer}>
        <LoginBox />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 20,
    fontWeight: 700,
  },
  loginContainer: {
    height: 300,
    margin: 10,
    borderRadius: 20,
    backgroundColor: "white",
    borderWidth: 2,
  },
});

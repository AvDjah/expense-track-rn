import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { AppStateContext } from "../../app/_layout";
import { SafeAreaView } from "react-native-safe-area-context";

const HeaderBar = () => {
  const appContext = useContext(AppStateContext);
  const username = appContext.appState.user?.name || "Guest"; // Fallback to "Guest" if user is not logged in

  return (
    <SafeAreaView style={styles.headerContainer}>
      <Text style={styles.headerText}>Welcome, {username}!</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#F5F5F5", // Slightly off-white background
    padding: 16,
    margin: 16,
    borderRadius: 8,
    elevation: 4, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    alignItems: "flex-start", // Align text to the left
  },
  headerText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#388E3C", // Green text color
  },
});

export default HeaderBar;

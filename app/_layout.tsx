import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import React from "react";

export interface User {
  name: string;
  email: string;
  token: string;
}

export interface AppState {
  user: User | null;
  loggedIn: boolean;
}

const defaultState: AppState = {
  user: null,
  loggedIn: false,
};

export const AppStateContext = React.createContext<AppState>(defaultState);

export default function RootLayout() {
  return (
    <AppStateContext.Provider value={defaultState}>
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerTitle: "Expense Tracxker",
        }}
      >
        <Stack.Screen name="index"></Stack.Screen>
      </Stack>
    </AppStateContext.Provider>
  );
}

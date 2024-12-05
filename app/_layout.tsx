import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native";
import React, { useState } from "react";
import { DeleteKeyFromStore } from "@/components/store/store";
import { USER_TOKEN_KEY } from "../components/store/store";

export interface User {
  name: string;
  email: string;
}

export interface AppState {
  user: User | null;
  loggedIn: boolean;
  userToken: null | string;
}

export interface AppStateContext {
  appState: AppState;
  loginUser: ((user: User) => void) | null;
  logoutUser: (() => void) | null;
}

const defaultState: AppState = {
  user: null,
  loggedIn: false,
  userToken: null,
};

const defaultAppContext: AppStateContext = {
  appState: defaultState,
  loginUser: null,
  logoutUser: null,
};

export const AppStateContext =
  React.createContext<AppStateContext>(defaultAppContext);

export default function RootLayout() {
  const [appState, setAppState] = useState<AppState>({
    loggedIn: false,
    user: null,
    userToken: null,
  });

  const loginUser = (user: User) => {
    setAppState({
      user: user,
      loggedIn: true,
      userToken: null,
    });
  };

  const logoutUser = () => {
    DeleteKeyFromStore(USER_TOKEN_KEY);
    setAppState({
      user: null,
      loggedIn: false,
      userToken: null,
    });
  };

  return (
    <AppStateContext.Provider
      value={{
        appState: appState,
        loginUser: loginUser,
        logoutUser: logoutUser,
      }}
    >
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

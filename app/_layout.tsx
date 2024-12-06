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
}

export interface AppStateContext {
  appState: AppState;
  userToken: string | null;
  setUserToken: ((token: string | null) => void) | null;
  loginUser: ((user: User) => void) | null;
  logoutUser: (() => void) | null;
}

const defaultState: AppState = {
  user: null,
  loggedIn: false,
};

const defaultAppContext: AppStateContext = {
  appState: defaultState,
  loginUser: null,
  logoutUser: null,
  userToken: null,
  setUserToken: null,
};

export const AppStateContext =
  React.createContext<AppStateContext>(defaultAppContext);

export default function RootLayout() {
  const [appState, setAppState] = useState<AppState>({
    loggedIn: false,
    user: null,
  });
  const [userToken, setUserToken] = useState<string | null>(null);

  const loginUser = (user: User) => {
    setAppState((prevState) => ({
      ...prevState,
      loggedIn: true,
      user: user,
    }));
  };

  const logoutUser = () => {
    DeleteKeyFromStore(USER_TOKEN_KEY);
    setAppState((prevState) => ({
      ...prevState,
      user: null,
      loggedIn: false,
    }));
    setUserToken(null);
  };

  return (
    // <React.StrictMode>
    <AppStateContext.Provider
      value={{
        appState: appState,
        loginUser: loginUser,
        logoutUser: logoutUser,
        userToken: userToken,
        setUserToken: setUserToken,
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
    // </React.StrictMode>
  );
}

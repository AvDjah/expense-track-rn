import { Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { Image, Text } from "react-native";
import React, { useEffect, useState } from "react";
import {
  DeleteKeyFromStore,
  GetValueFromStore,
  store,
  useAppSelector,
} from "@/components/store/store";
import { USER_TOKEN_KEY } from "../components/store/store";
import { Provider } from "react-redux";

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
  
  const tokenValue = GetValueFromStore(USER_TOKEN_KEY);

  const [userToken, setUserToken] = useState<string | null>(
    tokenValue === "" ? null : tokenValue,
  );

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

  useEffect(() => {
    console.log("Once: checking user token to be good");
    checkUserAuth(userToken!);
  }, [userToken]);

  const checkUserAuth = async (token: string) => {
    try {
      const response = await fetch("http://10.0.2.2:8080/user/check", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        const data = await response.json();
        console.log("Success checking user: ", data);
        setAppState((prevState) => ({
          ...prevState,
          loggedIn: true,
          user: {
            name: data?.user?.Name,
            email: data?.user?.Username,
          },
        }));

      } else if (response.status === 401) {
        setAppState((prevState) => ({
          ...prevState,
          loggedIn: false,
        }));
      }
    } catch (error) {
      console.error("Error checking user:", error);
      setAppState((prevState) => ({
        ...prevState,
        loggedIn: false,
      }));
    }
  };

  return (
    // <React.StrictMode>
    <Provider store={store}>
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
            headerTitleStyle: {
              fontSize: 20,
            },
            headerTitle: "Expense Tractor",
            headerBackVisible: true,
            headerLeft: () => (
              <Image
                source={require("../assets/tractor.png")}
                style={{ width: 30, height: 30, margin: 10 }}
              />
            ),
          }}
        >
          <Stack.Screen name="index"></Stack.Screen>
        </Stack>
      </AppStateContext.Provider>
    </Provider>
    // </React.StrictMode>
  );
}

import { Link, router, useFocusEffect } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  Text,
  TextInput,
  View,
  Animated,
  StyleSheet,
} from "react-native";
import ExpenseItem from "./ExpenseItem";
import { AppStateContext } from "./_layout";
import { GetValueFromStore, USER_TOKEN_KEY } from "../components/store/store";
import ExpenseList from "@/components/home/itemList";
import HeaderBar from "@/components/home/topBar";

// Add this interface before your component
export interface Expense {
  Amount: number;
  CategoryID: {
    Int64: number;
    Valid: boolean;
  };
  CreatedOn: {
    Time: string;
    Valid: boolean;
  };
  Description: {
    String: string;
    Valid: boolean;
  };
  ID: number;
  Name: string;
  PaymentType: string;
  UpdatedOn: {
    Time: string;
    Valid: boolean;
  };
  UserID: number;
}

const buttonStyles = StyleSheet.create({
  base: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
    width: 150,
    alignSelf: "center",
  },
  text: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
});

export default function Index() {
  const appContext = useContext(AppStateContext);
  const [expenses, setExpenseList] = useState<Expense[]>([]);

  const fetchExpenses = async () => {
    if (appContext.userToken === null) {
      // setExpenseList([]);
      console.log("could not fetch expenses since no token");
      return;
    }

    try {
      const response = await fetch("http://10.0.2.2:8080/expense/all", {
        headers: {
          Authorization: "Bearer " + appContext.userToken,
          "Content-Type": "application/json",
        },
      });
      const data: Expense[] = await response.json();
      setExpenseList(data);
      console.log("Fetched expenses: ", data.length);
    } catch (error) {
      setExpenseList([]);
      console.error("Error fetching expenses: ", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      triggerFetch();
    }, []),
  );

  const populateToken = async () => {
    let token;
    if (appContext.userToken === null || appContext.userToken === "") {
      token = await GetValueFromStore(USER_TOKEN_KEY);
      console.log("Populating token got: ", token);
      if (token !== "") {
        await checkUserAuth(token);
      } else {
        setExpenseList([]);
      }
    }
  };

  useEffect(() => {
    console.log("Runnig useEffect for userToken");
    checkIfLoggedIn().then(() => {
      triggerFetch();
    });
  }, [appContext.userToken]);

  const checkIfLoggedIn = async () => {
    let token;
    console.log("checkingIfLoggedIn");
    console.log(
      "Before checking login -> appContext token: ",
      appContext.userToken,
    );
    if (appContext.userToken === null || appContext.userToken === "") {
      token = await GetValueFromStore(USER_TOKEN_KEY);
      console.log("Got token from store: ", token);
      if (token === "") {
        router.push("/login");
        return;
      } else {
        appContext.setUserToken!(token);
      }
    } else {
      token = appContext.userToken;
    }

    console.log("appContext token:", appContext.userToken);
    console.log("and token value: ", token);

    if (token !== "" && token !== undefined) {
      console.log(`Had token before checking: ${token}`);
      await checkUserAuth(token); // Call the extracted function
    } else {
      console.log("Error reading token from memory as token: ", token);
    }
  };

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
        console.log("Successfull authentication");
        const data = await response.json();
        console.log("User check response:", data);
        appContext.loginUser!({
          email: data.user.Username,
          name: data.user.Name,
        });
      } else if (response.status === 401) {
        console.log("Unauthorized");
        appContext.logoutUser!();
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error checking user:", error);
    }
  };

  const triggerFetch = () => {
    fetchExpenses();
  };

  return (
    <SafeAreaView
      style={{
        height: "100%",
      }}
    >
      <View
        style={{
          margin: 10,
          padding: 10,
          flexDirection: "column",
          gap: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <HeaderBar />
        <Text
          style={{
            fontSize: 12, // Changed font size to 12
            textAlign: "center",
          }}
        >
          User is currently:{" "}
          {appContext.appState.loggedIn
            ? "Logged In as: " + JSON.stringify(appContext.appState.user)
            : "Logged out"}
        </Text>
        {appContext.appState.loggedIn == false && (
          <Pressable style={buttonStyles.base}>
            <Link href="/login">
              <Text style={buttonStyles.text}>Log In</Text>
            </Link>
          </Pressable>
        )}
        {appContext.appState.loggedIn == true && (
          <Pressable onPress={appContext.logoutUser} style={buttonStyles.base}>
            <Text style={buttonStyles.text}>Log Out</Text>
          </Pressable>
        )}
      </View>
      {appContext.appState.loggedIn && <ExpenseList expenses={expenses} />}
    </SafeAreaView>
  );
}

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
} from "react-native";
import ExpenseItem from "./ExpenseItem";
import { AppStateContext } from "./_layout";
import { GetValueFromStore, USER_TOKEN_KEY } from "../components/store/store";

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

export default function Index() {
  const [count, setCount] = useState(0);

  const appContext = useContext(AppStateContext);

  const incrementCount = () => {
    setCount(count + 1);
  };

  const decrementCount = () => {
    setCount(count - 1);
  };

  const [posts, setPostList] = useState<Expense[]>([]);

  const fetchExpenses = async () => {
    if (appContext.appState.userToken === null) {
      router.push("/login");
    }

    try {
      const response = await fetch("http://10.0.2.2:8080/expense/all", {
        headers: {
          Authorization: "Bearer " + appContext.appState.userToken,
          "Content-Type": "application/json",
        },
      });
      const data: Expense[] = await response.json();
      setPostList(data);
      console.log("Fetched expenses: ", data.length);
    } catch (error) {
      console.error("Error fetching expenses: ", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      checkIfLoggedIn().then(() => {
        triggerFetch();
      });
    }, []),
  );

  const checkIfLoggedIn = async () => {
    let token;
    if (appContext.appState.userToken === null) {
      token = await GetValueFromStore(USER_TOKEN_KEY);
      console.log("Got token: ", token);
      if (token === "") {
        router.push("/login");
      } else {
        appContext.appState.userToken = token;
      }
    }

    if (token !== "" && token !== undefined) {
      console.log(`Had token: ${token} before fetch checking`);
      fetch("http://10.0.2.2:8080/user/check", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (response.status === 200) {
            console.log("Successfull authentication");
            return response.json();
          } else if (response.status === 401) {
            // Handle unauthorized case (e.g., log out the user)
            console.log("Unauthorized");
            appContext.logoutUser!();
            return null; // or throw an error
          } else {
            // Handle other error responses
            throw new Error(`HTTP error! status: ${response.status}`);
          }
        })
        .then((data) => {
          if (data !== null) {
            console.log("User check response:", data);
            appContext.loginUser!({
              email: data.user.Username,
              name: data.user.Name,
            });
          }
        })
        .catch((error) => {
          console.error("Error checking user:", error);
        });
    } else {
      console.log("Error reading token from memory");
    }
  };

  const triggerFetch = () => {
    fetchExpenses();
  };

  // useEffect(() => {
  //   triggerFetch();
  //   console.log("Initial fetch completed");
  // }, []);

  // Create an Animated.Value for background color interpolation
  const [animatedValue, setAnimatedValue] = useState(new Animated.Value(0));

  // Create interpolated background color
  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["white", "lightblue"],
  });

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
        }}
      >
        <Text
          style={{
            fontSize: 20,
            textAlign: "center",
          }}
        >
          User is currently:{" "}
          {appContext.appState.loggedIn
            ? "Logged In as: " + JSON.stringify(appContext.appState.user)
            : "Logged out"}
        </Text>
        {appContext.appState.loggedIn == false && (
          <Pressable
            style={{
              backgroundColor: "darkgreen",
              paddingHorizontal: 10,
              paddingVertical: 5,
              borderRadius: 15,
              marginBottom: 10,
              width: 100,
            }}
          >
            <Link href="/login">
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  textAlign: "center",
                  width: "100%",
                }}
              >
                Log In
              </Text>
            </Link>
          </Pressable>
        )}
        {appContext.appState.loggedIn == true && (
          <Pressable
            onPress={appContext.logoutUser}
            style={{
              backgroundColor: "green",
              padding: 10,
              borderRadius: 20,
              marginTop: 10,
              width: 150,
              alignSelf: "center",
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: 20,
                textAlign: "center",
              }}
            >
              Log Out
            </Text>
          </Pressable>
        )}
      </View>
      <View
        style={{
          alignItems: "center",
          margin: 10,
        }}
      >
        <Animated.View
          style={{
            backgroundColor: backgroundColor,
            alignItems: "center",
            padding: 10,
            borderWidth: 2,
            borderRadius: 15,
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
        >
          <Pressable
            style={{
              alignSelf: "flex-start",
            }}
          >
            <Link href="/addExpense">
              <Text
                style={{
                  fontSize: 20,
                }}
              >
                Add New
              </Text>
            </Link>
          </Pressable>
        </Animated.View>
      </View>
      <SafeAreaView
        style={{
          borderWidth: 2,
          margin: 10,
          borderRadius: 15,
          maxHeight: "50%",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            textAlign: "center",
          }}
        >
          Expenses
        </Text>
        <View
          style={{
            height: 2,
            backgroundColor: "gray",
            marginVertical: 4,
          }}
        ></View>
        <FlatList
          style={{
            height: "100%",
          }}
          data={posts}
          renderItem={(item) => <ExpenseItem expense={item.item} />}
          keyExtractor={(item) => item.ID.toString()}
        ></FlatList>
      </SafeAreaView>
    </SafeAreaView>
  );
}

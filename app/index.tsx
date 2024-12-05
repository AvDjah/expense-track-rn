import { Link, useFocusEffect } from "expo-router";
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

  let token =
    "n4LLFJhK0jY7rISukAc2KGPvwgQLzS3fmXnNwOqiTvX4j8zsd1ZfUsfxgSuEsQs5UHrlGcZ8ax/y5iywpI2zpB4Qxb3PFPHEvg+iHYCIz9rQU8rVGe+NuMLy2+vpj9Kkx3kG58KMJEot3mfJ/bi8g8UdsfZdQl+m2y9TMB7zKZSeAIIww9swA6AaUSdptSiIFUkryH9+fFNLaFc9Bh2N2YvvTjuIPhQqwmWy7S7Xd8Ya37t+dtIhU9FkG4Y9EMNFH3qy7L9jbYLHIp/gEcaq";

  const fetchExpenses = async () => {
    try {
      const response = await fetch("http://10.0.2.2:8080/expense/all", {
        headers: {
          Authorization: "Bearer " + token,
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
      triggerFetch();
    }, []),
  );

  const triggerFetch = () => {
    fetchExpenses();
  };

  useEffect(() => {
    triggerFetch();
    console.log("Initial fetch completed");
  }, []);

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
        backgroundColor: "#F0F8F0",
      }}
    >
      <View
        style={{
          margin: 10,
          padding: 10,
          flexDirection: "row",
          gap: 10,
        }}
      >
        <Text
          style={{
            fontSize: 20,
          }}
        >
          User is currently: {appContext.loggedIn ? "Logged In" : "Logged out"}
        </Text>
        {appContext.loggedIn == false && (
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

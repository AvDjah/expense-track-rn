import { Expense } from "@/app";
import { AppStateContext } from "@/app/_layout";
import ExpenseItem from "@/app/ExpenseItem";
import { Link, useFocusEffect } from "expo-router";
import { useCallback, useContext, useState } from "react";
import {
  Animated,
  FlatList,
  Pressable,
  SafeAreaView,
  View,
  Text,
} from "react-native";

export default function ExpenseList() {
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


  const triggerFetch = () => {
    fetchExpenses();
  };

  return (
    <SafeAreaView>
      <View
        style={{
          alignItems: "center",
          margin: 10,
        }}
      >
        <Animated.View
          style={{
            alignItems: "center",
            padding: 10,
            borderWidth: 2,
            borderRadius: 15,
            paddingVertical: 10,
            paddingHorizontal: 20,
          }}
        >
          <Link href="/addExpense">
            <Pressable
              style={{
                alignSelf: "flex-start",
              }}
            >
              <Text
                style={{
                  fontSize: 12,
                }}
              >
                Add New
              </Text>
            </Pressable>
          </Link>
        </Animated.View>
      </View>
      <SafeAreaView
        style={{
          borderWidth: 2,
          margin: 10,
          borderRadius: 15,
          maxHeight: "70%",
        }}
      >
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 15,
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
          data={expenses}
          renderItem={(item) => <ExpenseItem expense={item.item} />}
          keyExtractor={(item) => item.ID.toString()}
        ></FlatList>
      </SafeAreaView>
    </SafeAreaView>
  );
}

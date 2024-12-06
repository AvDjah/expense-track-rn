import { Expense } from "@/app";
import ExpenseItem from "@/app/ExpenseItem";
import { Link } from "expo-router";
import {
  Animated,
  FlatList,
  Pressable,
  SafeAreaView,
  View,
  Text,
} from "react-native";

export default function ExpenseList({ expenses }: { expenses: Expense[] }) {
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
          data={expenses}
          renderItem={(item) => <ExpenseItem expense={item.item} />}
          keyExtractor={(item) => item.ID.toString()}
        ></FlatList>
      </SafeAreaView>
    </SafeAreaView>
  );
}

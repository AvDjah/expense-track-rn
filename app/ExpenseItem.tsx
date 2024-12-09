import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  LayoutChangeEvent,
  DimensionValue,
} from "react-native";
import { useEffect, useState } from "react";
import { Expense } from ".";

export default function ExpenseItem({ expense }: { expense: Expense }) {

  let currency = "Rs.";


  return (
    <View
      style={{
        marginBottom: 10,
        marginTop: 10,
        padding: 15,
        marginHorizontal: 10,
        boxShadow: "2px",
        backgroundColor: "white",
        borderWidth: 1,
        borderRadius: 7,
        overflow: "hidden",
      }}
    >
      <View
        style={{
          justifyContent: "space-between",
          flexDirection: "row",
          // height: expanded ? '100%' : 30,
        }}
      >
        <View
          style={{
            flexDirection: "column",
            gap: 10,

            flex: 1,
            marginRight: 10,
          }}
        >
          <Text
            style={{
              width: "100%",
              flexWrap: "wrap",
              fontWeight: "800",
              fontSize: 15, // Changed font size to 15 for heading
            }}
          // numberOfLines={expanded ? undefined : 2}
          >
            {expense.Name}
          </Text>
          <Text
            style={{
              color: "#cc3333",
              fontWeight: "700",
              fontSize: 12, // Changed font size to 12
            }}
          >
            {currency} {expense.Amount}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#f0f0f0",
            padding: 10,
            borderRadius: 5,
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <Text style={{ color: "#333", fontSize: 10 }}>
            {expense.CreatedOn.Time.split("T")[1].slice(0, 5)} {/* hh:mm */}
          </Text>
          <Text style={{ color: "#333", fontSize: 10 }}>
            {new Date(expense.CreatedOn.Time).toLocaleDateString("en-GB")} {/* dd-mm-yyyy */}
          </Text>
        </View>

      </View>
    </View>
  );
}

const CustomButton = () => {
  return (
    <Pressable
      style={{
        backgroundColor: "black",
        width: 75,
        padding: 7,
        borderRadius: 10,
        height: 40,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Text
        style={{
          color: "white",
          textAlign: "center",
          textAlignVertical: "center",
          fontSize: 12, // Changed font size to 12
        }}
      >
        Click me
      </Text>
    </Pressable>
  );
};

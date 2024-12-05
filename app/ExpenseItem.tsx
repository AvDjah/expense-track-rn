import {
  View,
  Text,
  StyleSheet,
  Button,
  Pressable,
  ScrollView,
  LayoutChangeEvent,
  DimensionValue,
} from "react-native";
import { useEffect, useState } from "react";
import { Expense } from ".";

export default function ExpenseItem({ expense }: { expense: Expense }) {
  const [isExpandable, setIsExpandable] = useState(false);

  const [expanded, setExpanded] = useState(false);

  let isCompressed = false;

  let currency = "Rs."

  const layoutCheck = (e: LayoutChangeEvent) => {
    console.log("Height of element: ", e.nativeEvent.layout.height);
    const height = e.nativeEvent.layout.height;
    if (height > 50) {
      console.log("Setting layout to expandable");
      setIsExpandable(true);
      isCompressed = true;
    }
  };

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

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
              fontSize: 20,
            }}
            onLayout={layoutCheck}
            // numberOfLines={expanded ? undefined : 2}
          >
            {expense.Name}
          </Text>
          <Text
            style={{
              color: "#cc3333",
              fontWeight: "700",
              fontSize: 15
            }}
          >
            {currency} {expense.Amount}
          </Text>
        </View>
        <CustomButton />
      </View>
      {isExpandable ? (
        <Pressable
          style={{
            backgroundColor: "#6206d4",
            width: 60,
            padding: 5,
            borderRadius: 4,
            marginTop: 10,
          }}
        >
          <Text
            style={{
              color: "white",
              textAlign: "center",
            }}
          >
            {expanded ? "Collapse" : "Expand"}
          </Text>
        </Pressable>
      ) : (
        <View></View>
      )}
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
        }}
      >
        Click me
      </Text>
    </Pressable>
  );
};

import HistoryGraph from "@/components/history/historyGraph";
import { useAppDispatch, useAppSelector } from "@/components/store/store";
import { SafeAreaView, View, Text, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { Expense } from ".";
import { useEffect } from "react";
import { fetchCategories } from "@/components/store/category";

export const groupExpensesByCategory = (
  expenses: Expense[],
): { [categoryId: number]: Expense[] } & { invalidCategory: Expense[] } => {
  const groupedExpenses: { [categoryId: number]: Expense[] } & {
    invalidCategory: Expense[];
  } = {
    invalidCategory: [],
  };

  expenses.forEach((expense) => {
    if (expense.CategoryID.Valid) {
      const categoryId = expense.CategoryID.Int64;
      if (!groupedExpenses[categoryId]) {
        groupedExpenses[categoryId] = [];
      }
      groupedExpenses[categoryId].push(expense);
    } else {
      groupedExpenses.invalidCategory.push(expense);
    }
  });

  return groupedExpenses;
};

export default function ShowHistory() {
  const expenses = useAppSelector((state) => state.expenses);
  const graphData = expenses.map((expense: Expense) => {
    return {
      value: expense.Amount,
      date: new Date(expense.CreatedOn.Time),
    };
  });
  const categories = useAppSelector((state) => state.categories);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (categories.state === "idle") {
      dispatch(fetchCategories());
    }
  }, []);

  const groupedExpense = groupExpensesByCategory(expenses);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        borderWidth: 2,
        margin: 10,
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <HistoryGraph data={graphData} />
      </View>
      <View
        style={{
          flex: 1,
          padding: 20,
          margin: 10,
        }}
      >
        <Text>Show Grouped Prices Here</Text>
        <FlatList
          data={Object.entries(groupedExpense).filter(
            ([key]) => !isNaN(parseInt(key)),
          )}
          renderItem={({ item: [key, expenses] }) => {
            const categoryId = parseInt(key);
            return <GroupItem key={key} expenses={expenses} id={categoryId} />;
          }}
        />
      </View>
    </SafeAreaView>
  );
}

const GroupItem = ({ expenses, id }: { expenses: Expense[]; id: number }) => {
  const categories = useAppSelector((state) => state.categories.categories);

  let currency = "Rs.";

  let amount = 0;
  expenses.forEach((expense) => {
    amount += expense.Amount;
  });

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
            {categories.find((x) => x.Id == id)?.Name}
          </Text>
          <Text
            style={{
              color: "#cc3333",
              fontWeight: "700",
              fontSize: 12, // Changed font size to 12
            }}
          >
            {currency} {amount}
          </Text>
        </View>
        <View
          style={{
            backgroundColor: "#f0f0f0",
            padding: 10,
            borderRadius: 5,
            flexDirection: "column",
            alignItems: "center",
          }}
        ></View>
      </View>
    </View>
  );
};

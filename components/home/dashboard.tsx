import { View, Text, Pressable, AppState, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";

export default function Dashboard() {
  const expenseList = useSelector((state: RootState) => state.expenses);

  const totalExpenses = expenseList.reduce(
    (sum, expense) => sum + expense.Amount,
    0,
  );

  const roundedTotalExpenses = totalExpenses.toFixed(2); // Round to two decimal places

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Dashboard</Text>
      </View>
     <View style={{
      flexDirection: "row",
      justifyContent: "space-between",
      margin: 5, padding: 4,
     }} >
        <Text style={{...styles.rowText}} >
          Amount Spent
        </Text>
        <Text style={{...styles.rowText}} >
          Rs. {roundedTotalExpenses} 
        </Text>
     </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
    padding: 12,
    backgroundColor: "green",
    borderRadius: 10,
    height: 200,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, 
  },
  headingContainer: {
    alignItems: "center",
    marginBottom: 10,
  },
  heading: {
    fontSize: 25,
    marginBottom: 10,
    textAlign: "center",
    color: "white",
  },
  rowText: {
    color: "#C7F464",
    fontSize: 15,
    fontWeight: "bold"
  }
});


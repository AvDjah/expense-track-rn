import { SafeAreaView, Text } from "react-native";
import { View, FlatList, Image, Pressable } from "react-native"; // Import necessary components
import { Link } from "expo-router";
import { useAppDispatch, useAppSelector } from "../../components/store/store";
import { RootState } from "@/components/store/store";
import { useEffect } from "react";
import { Category, fetchCategories } from "@/components/store/category";




export default function Categories() {

  const categories = useAppSelector((state: RootState) => state.categories)
  const expenses = useAppSelector((state: RootState) => state.expenses)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if(categories.state === 'idle'){
      dispatch(fetchCategories())
    }
  },[])

  // console.log("from cate component: ",categories)

  return (
    <SafeAreaView style={{ flex: 1, padding: 16 }}>
      <SafeAreaView
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 5,
        }}
      >
        <Text style={{ fontSize: 24, fontWeight: "bold", marginBottom: 16 }}>
          Categories
        </Text>
        <Pressable
          style={{
            borderWidth: 2,
            borderRadius: 8,
          }}
        >
          <Link
            style={{
              padding: 8,
            }}
            href="/categories/addNew"
          >
            <Text>Add New</Text>
          </Link>
        </Pressable>
      </SafeAreaView>
      {categories.state === 'failed' && <Text>{categories.error}</Text>}
      <FlatList
        data={categories.categories}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <CategoryItem item={{
          item: item,
          spent: expenses.filter(expense => expense.CategoryID.Int64 === item.Id).reduce((sum, expense) => sum + expense.Amount, 0),
          budget: 2000
        }} />}
      />
    </SafeAreaView>
  );
}

interface CategoryListItemProps {
  item: Category;
  spent : number,
  budget : number
}


const CategoryItem = ({ item }: { item: CategoryListItemProps }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#f0f0rf0",
        padding: 16,
        marginBottom: 16,
        borderRadius: 8,
        borderWidth: 2,
      }}
    >
      <View style={{
        flex: 2
      }} >
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>{item.item.Name}</Text>
        <Text style={{ color: "gray" }}>{item.item.Description}</Text>
      </View>
      <View style={{
        flex: 1
      }} >
        <Text style={{
          color: 'red',
          fontWeight: 600
        }} >Spent: Rs {item.spent}</Text>
        <Text style={{
          color: 'green',
          fontWeight: 600
        }}  >Budget: Rs {item.budget}</Text>
      </View>
    </View>
  );
};

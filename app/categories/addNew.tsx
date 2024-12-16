import {
  SafeAreaView,
  Text,
  View,
  TextInput,
  StyleSheet,
  Pressable,
} from "react-native";
import { useContext, useState } from "react";
import { AppStateContext } from "../_layout";
import { router } from "expo-router";
import { useAppDispatch } from "@/components/store/store";
import { Category, createCategory } from "@/components/store/category";

export default function AddNewCategory() {
  const appContext = useContext(AppStateContext);
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const dispatch = useAppDispatch()

  

  const submitData = async () => {
    if (appContext.userToken === "" || appContext.userToken === null) {
      console.log("Token does not exist, hence fetch cancelled.");
      return;
    }
    const token = appContext.userToken;

    try {
      const category: Category = {
        Name: categoryName,
        Description: categoryDescription,
        Id: 0
      };
      const result = await dispatch(createCategory(category));
      if (createCategory.fulfilled.match(result)) {
        console.log("Success:", result.payload);
        router.back();
      } else {
        console.error("Error:", result.error.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.view}>
        <Text style={styles.title}>Add New Category</Text>
        <View>
          <Text>Name</Text>
          <TextInput
            placeholder="Enter category name"
            value={categoryName}
            onChangeText={setCategoryName}
            style={styles.input}
            placeholderTextColor="gray"
          />
        </View>
        <View>
          <Text style={styles.descriptionLabel}>Description</Text>
          <TextInput
            placeholder="Enter category description"
            value={categoryDescription}
            onChangeText={setCategoryDescription}
            multiline={true}
            numberOfLines={4}
            style={styles.textarea}
            placeholderTextColor="gray"
          />
        </View>
        <Pressable onPress={submitData} style={styles.button}>
          <Text style={styles.buttonText}>Submit</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}


  const styles = StyleSheet.create({
    safeArea: {
      margin: 10,
    },
    view: {
      padding: 10,
      marginBottom: 10,
    },
    title: {
      fontSize: 20,
      marginBottom: 10,
    },
    descriptionLabel: {
      marginTop: 10,
    },
    button: {
      borderRadius: 10,
      backgroundColor: "#4CAF50",
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderWidth: 1,
      borderColor: "#388E8E",
      color: "white",
      alignItems: "center",
      justifyContent: "center",
      marginTop: 20,
    },
    buttonText: {
      color: "white",
      fontSize: 16,
      fontWeight: "bold",
    },
    input: {
      borderColor: "lightgray",
      borderWidth: 1,
      padding: 10,
      borderRadius: 10,
      marginTop: 5,
    },
    textarea: {
      borderColor: "lightgray",
      borderWidth: 1,
      padding: 10,
      borderRadius: 10,
      marginTop: 5,
      height: 100,
    },
  });

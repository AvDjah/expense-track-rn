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
  StyleSheet,
} from "react-native";
import ExpenseItem from "./ExpenseItem";
import { AppStateContext } from "./_layout";
import { GetValueFromStore, USER_TOKEN_KEY } from "../components/store/store";
import ExpenseList from "@/components/home/itemList";
import HeaderBar from "@/components/home/topBar";

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

const buttonStyles = StyleSheet.create({
  base: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
    width: 100,
    alignSelf: "center",
  },
  text: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
});

export default function Index() {
  const appContext = useContext(AppStateContext);
  

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
          flexDirection: "row",
          gap: 10,
          justifyContent: "space-between",
          alignItems: "center",
          
        }}
      >
        {appContext.appState.loggedIn && <HeaderBar />}

        {appContext.appState.loggedIn == false && (
          <Pressable style={buttonStyles.base}>
            <Link href="/login">
              <Text style={buttonStyles.text}>Log In</Text>
            </Link>
          </Pressable>
        )}
        {appContext.appState.loggedIn == true && (
          <Pressable onPress={appContext.logoutUser} style={buttonStyles.base}>
            <Text style={buttonStyles.text}>Log Out</Text>
          </Pressable>
        )}
      </View>
      {appContext.appState.loggedIn && <ExpenseList />}
    </SafeAreaView>
  );
}

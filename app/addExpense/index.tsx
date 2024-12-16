import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { useContext, useEffect, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { AppStateContext } from "../_layout";
import DropdownComponent from "@/components/dropdown";
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from "@/components/store/store";
import { Category, fetchCategories } from "@/components/store/category";
import { useDispatch } from "react-redux";

type AndroidMode = "date" | "time";

export default function AddExpense() {
  const appContext = useContext(AppStateContext);

  const categories = useAppSelector((state: RootState) => state.categories);
  const dispatch = useAppDispatch();

  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  // Date Fields
  const [date, setDate] = useState(new Date());
  const [modeDate, setModeDate] = useState<AndroidMode>("date");
  const [showDate, setShowDate] = useState(false);

  // Time Fields
  const [time, setTime] = useState(new Date());
  const [modeTime, setModeTime] = useState<AndroidMode>("time");
  const [showTime, setShowTime] = useState(false);

  // Category Field
  const [categoryId, setCategoryId] = useState<string | null>(null);

  const onChangeDate = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShowDate(false);
    setDate(currentDate);
  };

  const onChangeTime = (event: any, selectedTime: Date | undefined) => {
    const currentTime = selectedTime || time;
    setShowTime(false);
    setTime(currentTime);
  };

  useEffect(() => {
    if (categories.state === "idle") {
      dispatch(fetchCategories());
    }
  }, []);

  const showModeDate = (currentMode: "date") => {
    setShowDate(true);
    setModeDate(currentMode);
  };

  const showModeTime = (currentMode: "time") => {
    setShowTime(true);
    setModeTime(currentMode);
  };

  const showDatepicker = () => {
    showModeDate("date");
  };

  const showTimepicker = () => {
    showModeTime("time");
  };

  const submitData = async () => {
    if (!expenseName || !date || !amount || amount === "0") {
      console.log("Name, date, amount can not be empty or zero");
      return;
    }

    if (appContext.userToken === "" || appContext.userToken === null) {
      console.log("toke does not exist hence fetch cancelled.");
      return;
    }
    const token = appContext.userToken;
    try {
      const combinedDateTime = new Date(date);
      combinedDateTime.setHours(time.getHours());
      combinedDateTime.setMinutes(time.getMinutes());
      combinedDateTime.setSeconds(time.getSeconds());
      combinedDateTime.setMilliseconds(time.getMilliseconds());

      const response = await fetch("http://10.0.2.2:8080/expense/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: expenseName,
          amount: parseFloat(amount),
          date: combinedDateTime,
          description,
          paymentType: "credit",
          categoryId: categoryId,
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      console.log("Success:", data);
      router.back();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={{ padding: 10, margin: 10 }}>
      <Text style={{ fontSize: 20, marginBottom: 10 }}>Add Expense</Text>
      <View style={{ padding: 10, marginBottom: 10 }}>
        <Text>Expense Name</Text>
        <TextInput
          placeholder="Expense Name"
          value={expenseName}
          onChangeText={setExpenseName}
          style={styles.input}
          placeholderTextColor="gray"
        />
      </View>
      <View style={{ padding: 10, marginBottom: 10 }}>
        <Text>Amount</Text>
        <TextInput
          placeholder="Amount"
          value={amount}
          keyboardType="numeric"
          onChangeText={(text) => setAmount(text.replace(/^0+/, ""))}
          style={styles.input}
          placeholderTextColor="gray"
        />
      </View>
      <View style={{ padding: 10, marginBottom: 10 }}>
        <Text>Description</Text>
        <TextInput
          placeholder="Description"
          value={description}
          onChangeText={setDescription}
          multiline={true}
          numberOfLines={4}
          style={styles.textarea}
          placeholderTextColor="gray"
        />
      </View>
      <View style={{ padding: 10, marginBottom: 10 }}>
        <Text>Date</Text>
        <SafeAreaView>
          <Pressable style={styles.input} onPress={showDatepicker}>
            <Text>{date.toLocaleDateString("en-GB")}</Text>
          </Pressable>
          {showDate && (
            <DateTimePicker
              testID="dateTimePickerDate"
              value={date}
              mode={modeDate}
              is24Hour={true}
              onChange={onChangeDate}
            />
          )}
        </SafeAreaView>
      </View>
      <View style={{ padding: 10, marginBottom: 10 }}>
        <Text>Select Category</Text>
        <DropdownComponent
          setOptionValue={setCategoryId}
          data={categories.categories.map((el: Category) => {
            return { label: el.Name, value: el.Id };
          })}
        ></DropdownComponent>
      </View>
      <View style={{ padding: 10, marginBottom: 10 }}>
        <Text>Time</Text>
        <SafeAreaView>
          <Pressable style={styles.input} onPress={showTimepicker}>
            <Text>
              {time.toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </Text>
          </Pressable>
          {showTime && (
            <DateTimePicker
              testID="dateTimePickerTime"
              value={time}
              mode={modeTime}
              is24Hour={true}
              onChange={onChangeTime}
            />
          )}
        </SafeAreaView>
      </View>
      <Pressable onPress={submitData} style={styles.button}>
        <Text style={styles.buttonText}>Submit</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 10, // Adjust this value to control roundness
    backgroundColor: "#4CAF50", // A nice green; change as desired
    paddingVertical: 10, // Vertical padding inside the button
    paddingHorizontal: 20, // Horizontal padding
    borderWidth: 1, // Add a border
    borderColor: "#388E8E", // Border color; consider a shade darker than background
    color: "white", // Text color (assuming white on green background)
    alignItems: "center", // Center content horizontally
    justifyContent: "center", // Center content vertically
  },
  buttonText: {
    // Style for the text within the button
    color: "white", // Text color
    fontSize: 16, // Adjust font size as needed
    fontWeight: "bold", // Make text bold
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

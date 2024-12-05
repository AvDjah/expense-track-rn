import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import React, { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";

type AndroidMode = "date" | "time";

export default function AddExpense() {
  const [expenseName, setExpenseName] = useState("");
  const [amount, setAmount] = useState("0");
  const [description, setDescription] = useState("");

  // Date Fields
  const [date, setDate] = useState(new Date(1598051730000));
  const [modeDate, setModeDate] = useState<AndroidMode>("date");
  const [showDate, setShowDate] = useState(false);

  // Time Fields
  const [time, setTime] = useState(new Date());
  const [modeTime, setModeTime] = useState<AndroidMode>("time");
  const [showTime, setShowTime] = useState(false);

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

  let token =
    "n4LLFJhK0jY7rISukAc2KGPvwgQLzS3fmXnNwOqiTvX4j8zsd1ZfUsfxgSuEsQs5UHrlGcZ8ax/y5iywpI2zpB4Qxb3PFPHEvg+iHYCIz9rQU8rVGe+NuMLy2+vpj9Kkx3kG58KMJEot3mfJ/bi8g8UdsfZdQl+m2y9TMB7zKZSeAIIww9swA6AaUSdptSiIFUkryH9+fFNLaFc9Bh2N2YvvTjuIPhQqwmWy7S7Xd8Ya37t+dtIhU9FkG4Y9EMNFH3qy7L9jbYLHIp/gEcaq";

  const showTimepicker = () => {
    showModeTime("time");
  };

  const submitData = async () => {
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
          categoryId: 0,
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
          onChangeText={setAmount}
          keyboardType="numeric"
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

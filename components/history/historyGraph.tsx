import React, { useState } from "react";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import { LineGraph } from "react-native-graph";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  Canvas,
  Circle,
  Path,
  Points,
  Skia,
  SkPoint,
  vec,
  Text as TextPaint,
  useFont,
  Fill,
} from "@shopify/react-native-skia";
import { useDerivedValue, useSharedValue } from "react-native-reanimated";

const data = [
  { date: new Date("2023-12-01"), value: 55 },
  { date: new Date("2023-12-02"), value: 92 },
  { date: new Date("2023-12-03"), value: 78 },
  { date: new Date("2023-12-04"), value: 63 },
  { date: new Date("2023-12-05"), value: 89 },
  { date: new Date("2023-12-06"), value: 71 },
  { date: new Date("2023-12-07"), value: 95 },
  { date: new Date("2023-12-08"), value: 52 },
  { date: new Date("2023-12-09"), value: 84 },
  { date: new Date("2023-12-10"), value: 67 },
  { date: new Date("2023-12-11"), value: 90 },
  { date: new Date("2023-12-12"), value: 75 },
  { date: new Date("2023-12-13"), value: 58 },
  { date: new Date("2023-12-14"), value: 81 },
  { date: new Date("2023-12-15"), value: 69 },
  { date: new Date("2023-12-16"), value: 93 },
  { date: new Date("2023-12-17"), value: 72 },
  { date: new Date("2023-12-18"), value: 56 },
  { date: new Date("2023-12-19"), value: 87 },
  { date: new Date("2023-12-20"), value: 64 },
  { date: new Date("2023-12-21"), value: 98 },
  { date: new Date("2023-12-22"), value: 76 },
  { date: new Date("2023-12-23"), value: 51 },
  { date: new Date("2023-12-24"), value: 83 },
  { date: new Date("2023-12-25"), value: 70 },
  { date: new Date("2023-12-26"), value: 96 },
  { date: new Date("2023-12-27"), value: 79 },
  { date: new Date("2023-12-28"), value: 53 },
  { date: new Date("2023-12-29"), value: 85 },
  { date: new Date("2023-12-30"), value: 68 },
  { date: new Date("2023-12-31"), value: 91 },
];

export interface HistoryGraphProps {
  data: { date: Date; value: number }[];
}

export default function HistoryGraph({ data }: HistoryGraphProps) {
  const [selectedDate, setSelecteDate] = useState<{
    date: Date;
    value: number;
  } | null>(null);

  const path = Skia.Path.Make();
  const scaleX = 300 / 30;
  const scaleY = 300 / 100;
  path.moveTo(20, data[0].value * scaleY);
  const pricePoints: SkPoint[] = [];
  data.forEach((point, index) => {
    if (index === 0) return;
    pricePoints.push(vec(20 + index * scaleX, 300 - point.value * scaleY));
    path.lineTo(20 + index * scaleX, 300 - point.value * scaleY);
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text>History Graph</Text>
      <View
        style={{
          backgroundColor: "white",
          borderWidth: 1,
          // flex: 1,
          height: selectedDate !== null ? 450 : 300,
          padding: 10,
          borderRadius: 10,
        }}
      >
        {selectedDate !== null && (
          <View
            style={{
              backgroundColor: "white",
              padding: 10,
              borderRadius: 10,
              borderWidth: 1,
            }}
          >
            <Text>Spent :</Text>
            <Text
              style={{
                color: "#673AB7",
                fontSize: 20,
                fontWeight: 700,
                marginVertical: 5,
              }}
            >
              Rs. {selectedDate.value}
            </Text>
            <Text
              style={{
                color: "#673AB7",
                fontSize: 15,
              }}
            >
              on:{" "}
              {selectedDate.date.toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric", // Added year
              })}
            </Text>
            <Text></Text>
          </View>
        )}
        <GestureHandlerRootView
          onTouchMove={(ev) => {
            // console.log("ev: ", ev)
          }}
        >
          <LineGraph
            points={data}
            animated={true}
            color="#008000"
            style={{
              width: 300,
              height: 300,
            }}
            enablePanGesture={true}
            onPointSelected={(point) => {
              // console.log("prev value: ", selectedDate.value);
              console.log("point selected: ", point);
              setSelecteDate(point);
              // selectedDate.value = point.date.toLocaleDateString();
            }}
            onPointerLeave={() => {
              setSelecteDate(null);
            }}
          ></LineGraph>
          {/* <Canvas style={{ flex: 1 }}>
            <Path
              path={path}
              color="lightblue"
              style="stroke"
              strokeJoin="round"
              strokeWidth={5}
            />
            <Path
              path="M 20 0 L 20 300  L 400 300"
              color="darkblue"
              style="stroke"
              strokeJoin="round"
              strokeWidth={2}
            />
            <Points
              points={pricePoints}
              mode="points"
              color="green"
              strokeWidth={4}
              // style="stroke"
            ></Points>
          </Canvas> */}
        </GestureHandlerRootView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // borderWidth: 2,
    margin: 20,
    justifyContent: "flex-start",
    flexDirection: "column",
    gap: 10,
    // alignItems: "c",
    padding: 10,
    // height: 600,
    flex: 1,
  },
});

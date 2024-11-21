import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack
    screenOptions={{
      headerStyle: {
        backgroundColor: '#21AAAF'
      },
      headerTitle: "Expense Tracker"
    }}
  >
    <Stack.Screen name="index" >
    </Stack.Screen>
    <Stack.Screen name="settings" >
    </Stack.Screen>

  </Stack>;
}

import * as SecureStore from "expo-secure-store";

export async function SetValueForStore(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
  console.log("Stored user token in secure store");
}

export async function GetValueFromStore(key: string): Promise<string> {
  let value = await SecureStore.getItemAsync(key);
  return value || "";
}

export async function DeleteKeyFromStore(key: string) {
  await SecureStore.deleteItemAsync(key);
  console.log("Deleted Key: ", key);
}

export const USER_TOKEN_KEY = "user_token";

import AsyncStorage from "@react-native-async-storage/async-storage";

export interface LogMessage {
  message: string;
  currentDate: Date;
  isEditMode: boolean;
}

export const storeData = async (value: LogMessage[]) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem("messages", jsonValue);
  } catch (e) {
    console.log(e);
    // saving error
  }
};

export const getData = async (): Promise<LogMessage[]> => {
  try {
    // AsyncStorage.clear();
    const jsonValue = await AsyncStorage.getItem("messages");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
    return [];
  }
};

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { getData, LogMessage, storeData } from "./src/lib/localStorage";
import { calculateMessagesSum } from "./src/lib/utilities";
import ExpensesScreen from "./src/screens/ExpensesScreen";
import HomeScreen from "./src/screens/HomeScreen";
import SettingsScreen from "./src/screens/SettingsScreen";
import { MenuProvider } from 'react-native-popup-menu';

export default function App() {
  const Tab = createBottomTabNavigator();

  const [totalSpent, onChangeTotalSpent] = React.useState(0);
  const [messages, onChangeMessages] = React.useState<LogMessage[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData();
      if (data) {
        onChangeMessages(data);
        onChangeTotalSpent(calculateMessagesSum(data));
      }
    };
    fetchData().catch(console.error);
  }, [messages]);

  const onSubmitMessage = async function (text: string) {
    if (text == "") return;

    const currentDate = new Date();
    const newMessages = [...messages, { message: text, currentDate, isEditMode: false }];

    onChangeMessages(newMessages);
    storeData(newMessages);
  };

  const onDeleteMessage = async function (index: number) {
    messages.splice(index, 1);
    onChangeMessages(messages);
    storeData(messages);
  }

  const onEditMessage = async function (index: number) {
    // var messages = [70,80]
    let message = messages[index];
    message.isEditMode = true;
    storeData(messages);
  }

  return (
    <MenuProvider>
      <View style={styles.root}>
        <View style={styles.tabs}>
          <NavigationContainer>
            <Tab.Navigator>
              <Tab.Screen
                name="Expenses"
                children={() => <ExpensesScreen totalSpent={totalSpent} />}
              />
              <Tab.Screen
                name="Home"
                children={() => <HomeScreen messages={messages} onSubmitMessage={onSubmitMessage}
                  onDeleteMessage={onDeleteMessage} onEditMessage={onEditMessage}/>}
              />
              <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
          </NavigationContainer>
        </View>
      </View>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  tabs: {
    flex: 1,
  },
});

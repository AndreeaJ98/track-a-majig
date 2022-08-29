import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import { LogMessage } from "../lib/localStorage";
import { MenuProvider } from 'react-native-popup-menu';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import { renderers } from 'react-native-popup-menu';
import { Message } from "../lib/Message";
const { SlideInMenu } = renderers;

type Props = {
  messages: LogMessage[];
  onSubmitMessage: (text: string) => {};
  onDeleteMessage: (index: number) => {};
  onEditMessage: (index: number) => {};
};

export default function HomeScreen(props: Props) {
  const [text, onChangeText] = React.useState("");

  const submitMessage = async function () {
    if (text == "") return;
    props.onSubmitMessage(text);
    onChangeText("");
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {props.messages.map((entry, i) => (
          <View key={i}>
            <Menu renderer={SlideInMenu}>
              <MenuTrigger triggerOnLongPress={true}>
                {entry.isEditMode == true
                  ? <TextInput>{entry.message}</TextInput>
                  : <Text style={styles.singleMessage} key={i}>
                    {entry.message}
                  </Text>
                }
         
              </MenuTrigger>
              <MenuOptions>
                <MenuOption onSelect={() => props.onEditMessage(i)} text='Edit' />
                <MenuOption onSelect={() => props.onDeleteMessage(i)}>
                  <Text style={{ color: 'red' }}>Delete</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
        ))}
      </ScrollView>

      <View style={styles.bottom}>
        <TextInput
          style={styles.inputMessage}
          onChangeText={onChangeText}
          value={text}
          placeholder="What did you buy today?"
        />
        <View style={styles.button}>
          <Button
            onPress={submitMessage}
            title="⬆️"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
      <StatusBar style="auto" />
      <Message text="Masina" isEditMode={true}/>
    </View>
  );
}

const styles = StyleSheet.create({
  singleMessage: {
    padding: 15,
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 20,
    backgroundColor: "#1BCC77",
    color: "white",
  },
  inputMessage: {
    padding: 8,
    margin: 10,
    borderRadius: 20,
    backgroundColor: "#F6F6F6",
    width: "95%",
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  scrollView: {
    display: "flex",
    alignSelf: "flex-start",
    paddingLeft: 10,
    paddingRight: 10,
    width: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  bottom: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    position: "absolute",
    right: 30,
  },
});

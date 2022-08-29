import React from "react";
import { Text, View, StyleSheet, TextInput } from "react-native";
import { renderers } from "react-native-popup-menu";

type Props = {
    text: string;
    isEditMode: boolean;
};

export const Message = (props: Props) => {
    if (props.isEditMode == true) {
        return (
            <View>
                <TextInput style={styles.singleMessage}>{props.text}</TextInput>
            </View>
        )
    }
    else {
        return (
            <View>
                <Text style={styles.singleMessage}>{props.text}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    singleMessage: {
        padding: 15,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 20,
        backgroundColor: "#1BCC77",
        color: "white",
    }
});
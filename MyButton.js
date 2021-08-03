import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function MyButton({ color, onPress, text }) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: color }]}
      onPress={onPress}
    >
      <Text>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    borderWidth: 0.5,
    flex: 1,
    justifyContent: "center",
    margin: 5,
    padding: 10,
  },
});

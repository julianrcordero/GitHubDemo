import React, { useState } from "react";
import {
  Alert,
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MyButton from "./MyButton";
const { width } = Dimensions.get("window");

export default function WelcomeScreen({ setRepo }) {
  const [text, setText] = useState("");

  const logIn = () => {
    if (text.length > 0) {
      setRepo(text);
    } else
      Alert.alert("Invalid username", "Please enter a valid username", [
        {
          text: "OK",
        },
      ]);
  };

  return (
    <View style={styles.container}>
      <Image
        resizeMode={"contain"}
        style={styles.image}
        source={require("./assets/GitHub-Mark.png")}
      />
      <View>
        <Text style={styles.text}>{"Please enter a repository name:"}</Text>
        <TextInput
          value={text}
          onChangeText={setText}
          style={styles.textInput}
        />
        <View style={styles.login}>
          <MyButton
            color={"dodgerblue"}
            onPress={logIn}
            text={"SHOW COMMITS"}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flex: 1,
    justifyContent: "space-evenly",
    width: width * 0.75,
  },
  image: { height: 250 },
  login: { height: 50, marginVertical: 10 },
  text: { textAlign: "center", padding: 10 },
  textInput: {
    borderWidth: 0.2,
    padding: 10,
    width: width * 0.75,
  },
});

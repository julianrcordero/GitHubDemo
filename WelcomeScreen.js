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

export default function WelcomeScreen({ setOwner, setRepo }) {
  const [first, setFirst] = useState("");
  const [second, setSecond] = useState("");

  const logIn = () => {
    if (first.length > 0 && second.length > 0) {
      setOwner(first);
      setRepo(second);
    } else
      Alert.alert(
        "Invalid repository",
        "Please enter a valid repository name",
        [
          {
            text: "OK",
          },
        ]
      );
  };

  return (
    <View style={styles.container}>
      <Image
        resizeMode={"contain"}
        style={styles.image}
        source={require("./assets/GitHub-Mark.png")}
      />
      <View>
        <Text style={styles.text}>
          {"Please enter an owner and repository name:"}
        </Text>
        <TextInput
          placeholder={"OWNER"}
          value={first}
          onChangeText={setFirst}
          style={styles.textInput}
        />
        <TextInput
          placeholder={"REPOSITORY"}
          value={second}
          onChangeText={setSecond}
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
    justifyContent: "flex-start",
    width: width * 0.75,
  },
  image: { height: 250 },
  login: { height: 50, marginVertical: 10 },
  text: { textAlign: "center", padding: 10 },
  textInput: {
    borderWidth: 0.5,
    marginVertical: 5,
    padding: 10,
    width: width * 0.75,
  },
});

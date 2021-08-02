import { StatusBar } from "expo-status-bar";
import React, { useEffect } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { create as apiCreate } from "apisauce";

export default function App() {
  const myURL = "https://api.github.com";
  const client = apiCreate({ baseURL: myURL });
  const getItem = () => client.get("/repos/twitter/bootstrap/commits", {});

  const loadData = async () => {
    const response = await getItem();
    if (response.ok) {
      console.log(response.data);
    } else {
      Alert.alert("Error retrieving data", "Please pull down to refresh", [
        {
          text: "OK",
        },
      ]);
    }
  };

  useEffect(() => {
    loadData();
  });

  return (
    <View style={styles.container}>
      <Text>GitHub Commits for the Bootstrap repository by Twitter</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

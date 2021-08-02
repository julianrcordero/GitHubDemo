import React, { useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import CommitCard from "./CommitCard";
import client from "./ApiClient";

export default function App() {
  const [data, setData] = useState([]);

  const getItem = () => client.get("/repos/twitter/bootstrap/commits", {});

  const loadData = async () => {
    const response = await getItem();
    if (response.ok) {
      setData(response.data.slice(0, 25));
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
  }, []);

  const renderItem = ({ item }) => (
    <CommitCard
      author={item.commit.author.name}
      hash={item.sha}
      message={item.commit.message}
    />
  );

  return (
    <View style={styles.container}>
      <Text>GitHub Commits for the Bootstrap repository by Twitter</Text>
      <FlatList data={data} renderItem={renderItem} />
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

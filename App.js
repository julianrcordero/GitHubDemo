import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CommitCard from "./CommitCard";
import client from "./ApiClient";

export default function App() {
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

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
      setData([]);
    }

    setRefreshing(false);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    loadData();
  };

  const renderItem = ({ item }) => (
    <CommitCard
      author={item.commit.author.name}
      date={item.commit.author.date}
      hash={item.sha}
      message={item.commit.message}
    />
  );

  const keyExtractor = (item) => item.node_id;

  return (
    <SafeAreaView style={styles.container}>
      <Text>GitHub Commits for the Bootstrap repository by Twitter</Text>

      <FlatList
        data={data}
        keyExtractor={keyExtractor}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        renderItem={renderItem}
        contentContainerStyle={styles.contentContainer}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  contentContainer: {
    width: "90%",
  },
});

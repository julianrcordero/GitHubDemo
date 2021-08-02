import React, { PureComponent, useEffect, useState } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import { create as apiCreate } from "apisauce";

class CommitCard extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { author, hash, message } = this.props;

    return (
      <View style={{ borderWidth: 1 }}>
        <Text style={{ fontSize: 20 }}>{author}</Text>
        <Text>{hash}</Text>
        <Text>{message}</Text>
      </View>
    );
  }
}

export default function App() {
  const [data, setData] = useState([]);

  const myURL = "https://api.github.com";
  const client = apiCreate({ baseURL: myURL });
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

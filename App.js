import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  FlatList,
  RefreshControl,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import CommitCard from "./CommitCard";
import commitsApi from "./api/commits";
import AuthContext from "./context";
import WelcomeScreen from "./WelcomeScreen";
import MyButton from "./MyButton";

export default function App() {
  const [owner, setOwner] = useState();
  const [repo, setRepo] = useState();
  const [data, setData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(false);

  const loadData = async () => {
    if (owner && repo) {
      const response = await commitsApi.getCommits(owner, repo);
      if (response.ok) {
        setError(false);
        setData(response.data);
      } else {
        setError(true);
        setData([]);
      }

      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [repo]);

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
      <AuthContext.Provider value={{ owner, repo, setRepo }}>
        {owner && repo ? (
          <>
            {error ? (
              <>
                <Text>Couldn't retrieve the commits.</Text>
                <View style={styles.buttonBox}>
                  <MyButton
                    text={"RETRY"}
                    color={"darkgrey"}
                    onPress={handleRefresh}
                  />
                </View>
              </>
            ) : (
              <Text>
                GitHub Commits for the '{repo.toLowerCase()}' repository by '
                {owner.toLowerCase()}'
              </Text>
            )}

            <FlatList
              data={data}
              keyExtractor={keyExtractor}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={handleRefresh}
                />
              }
              renderItem={renderItem}
              contentContainerStyle={styles.contentContainer}
            />
            <View style={styles.buttonBox}>
              <MyButton
                text={"Change Owner / Repository"}
                color={"darkgrey"}
                onPress={() => setRepo(null)}
              />
            </View>
          </>
        ) : (
          <WelcomeScreen setOwner={setOwner} setRepo={setRepo} />
        )}
      </AuthContext.Provider>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  buttonBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
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

import React, { PureComponent } from "react";
import { StyleSheet, Text, View } from "react-native";
import Moment from "moment";

export default class CommitCard extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { author, date, hash, message } = this.props;

    const formattedDate = Moment(date).format("ddd, MMMM Do YYYY, h:mm:ssa");

    return (
      <View style={styles.container}>
        <Text style={styles.message}>{message}</Text>
        <View style={styles.authorLine}>
          <Text style={styles.authorText}>{author}</Text>
          <Text style={styles.date}>{formattedDate}</Text>
        </View>
        <Text style={styles.hashLine}>
          {"SHA: "}
          <Text style={styles.hash}>{hash}</Text>
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  authorLine: {
    alignItems: "center",
    borderTopWidth: 1,
    flexDirection: "row",
    paddingVertical: 10,
  },
  authorText: {
    color: "darkslategrey",
    flex: 3,
    fontWeight: "bold",
    fontSize: 16,
  },
  container: {
    borderColor: "navy",
    borderRadius: 15,
    borderWidth: 2,
    marginVertical: 10,
    padding: 15,
  },
  date: {
    textAlign: "right",
    flex: 2,
    fontSize: 12,
  },
  hash: { color: "blue" },
  hashLine: { fontSize: 12 },
  message: {
    color: "navy",
    fontSize: 14,
    fontStyle: "italic",
    paddingBottom: 10,
  },
});

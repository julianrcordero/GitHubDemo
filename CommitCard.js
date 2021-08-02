import React, { PureComponent } from "react";
import { StyleSheet, Text, View } from "react-native";

export default class CommitCard extends PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { author, hash, message } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.authorText}>{author}</Text>
        <Text>{hash}</Text>
        <Text>{message}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  authorText: { fontSize: 20 },
  container: { borderWidth: 1, marginVertical: 5 },
});

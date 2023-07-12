import React from "react";
import { View, Text, StyleSheet } from "react-native";

const GenreTag = ({ genre }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{genre}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#007bff",
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  text: {
    fontSize: 12,
    color: "#fff",
  },
});

export default GenreTag;

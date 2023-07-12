import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Rating = ({ rating }) => {
  const stars = [];

  for (let i = 1; i <= 5; i++) {
    const name = i <= rating ? "star" : "star-outline";
    const color = i <= rating ? "#ffd700" : "#888";

    stars.push(
      <Ionicons key={i} name={name} size={24} color={color} style={styles.icon} />
    );
  }

  return (
    <View style={styles.container}>
      {stars}
      <Text style={styles.rating}>{rating}/5</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 4,
  },
  rating: {
    fontSize: 16,
    color: "#888",
    marginLeft: 4,
  },
});

export default Rating;

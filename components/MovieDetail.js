import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import Rating from "./Rating";
import GenreTag from "./GenreTag";
import Button from "./Button";

const MovieDetail = ({ title, image, year, rating, genre, description, onPressWatchNow, onBackPress }) => {
  const handleWatchNow = () => {
    if (onPressWatchNow) {
      onPressWatchNow();
    }
  };

  const handleBackPress = () => {
    if (onBackPress) {
      onBackPress();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />

      <View style={styles.contentContainer}>
        <LinearGradient
          colors={["transparent", "rgba(0, 0, 0, 0.8)"]}
          style={styles.gradientOverlay}
        />

        <View style={styles.header}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.year}>{year}</Text>
        </View>

        <View style={styles.ratingContainer}>
          <Rating rating={rating} />
        </View>

        <View style={styles.genreContainer}>
          {genre.map((genreItem, index) => (
            <GenreTag key={index} genre={genreItem} />
          ))}
        </View>

        <Text style={styles.description}>{description}</Text>

        <Button
          title="Watch Now"
          onPress={handleWatchNow}
          style={styles.watchNowButton}
        />

        <Button
          title="Back"
          onPress={handleBackPress}
          style={styles.backButton}
        />

        <View style={styles.iconContainer}>
          <Ionicons name="heart" size={24} color="#fff" style={styles.icon} />
          <Ionicons name="share-social" size={24} color="#fff" style={styles.icon} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 400,
    resizeMode: "cover",
  },
  contentContainer: {
    flex: 1,
    padding: 24,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  year: {
    fontSize: 16,
    color: "#fff",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  genreContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 24,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: "#fff",
    marginBottom: 24,
  },
  watchNowButton: {
    marginBottom: 16,
  },
  backButton: {
    marginBottom: 24,
    backgroundColor: "#888",
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  icon: {
    marginLeft: 16,
  },
});

export default MovieDetail;

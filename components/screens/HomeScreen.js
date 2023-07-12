import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from "react-native";
import axios from "axios";
import Header from "../Header";
import MovieCard from "../MovieCard";
import MovieDetail from "../MovieDetail";

const HomeScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetchMovies();
  }, [selectedGenre, selectedYear]);

  const fetchMovies = async () => {
    setIsLoading(true);

    try {
      const response = await axios.get(
        "https://imdb8.p.rapidapi.com/auto-complete",
        {
          params: {
            q: "game of thrones",
            genre: selectedGenre,
            year: selectedYear,
          },
          headers: {
            "X-RapidAPI-Key": "0651cb3b42msh3ce4f655964ec6ap16bd04jsn65b74045d4c3",
            "X-RapidAPI-Host": "imdb8.p.rapidapi.com",
          },
        }
      );

      setMovies(response.data.d);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleGenreSelect = (genre) => {
    setSelectedGenre(genre);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
  };

  const handleMoviePress = (movie) => {
    setSelectedMovie(movie);
  };

  const handleBackPress = () => {
    setSelectedMovie(null);
  };

  return (
    <View style={styles.container}>
      <Header title="Movies" />

      <View style={styles.filterContainer}>
        <Text style={styles.filterLabel}>Genre:</Text>
        <TouchableOpacity
          style={selectedGenre === "action" ? styles.selectedFilterButton : styles.filterButton}
          onPress={() => handleGenreSelect("action")}
        >
          <Text style={styles.filterButtonText}>Action</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selectedGenre === "comedy" ? styles.selectedFilterButton : styles.filterButton}
          onPress={() => handleGenreSelect("comedy")}
        >
          <Text style={styles.filterButtonText}>Comedy</Text>
        </TouchableOpacity>
        {/* Add more genre buttons here */}

        <Text style={styles.filterLabel}>Year:</Text>
        <TouchableOpacity
          style={selectedYear === 2022 ? styles.selectedFilterButton : styles.filterButton}
          onPress={() => handleYearSelect(2022)}
        >
          <Text style={styles.filterButtonText}>2022</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={selectedYear === 2021 ? styles.selectedFilterButton : styles.filterButton}
          onPress={() => handleYearSelect(2021)}
        >
          <Text style={styles.filterButtonText}>2021</Text>
        </TouchableOpacity>
        {/* Add more year buttons here */}
      </View>

      {isLoading ? (
        <Text>Loading..</Text>
      ) : selectedMovie ? (
        <MovieDetail
          title={selectedMovie.l}
          image={selectedMovie.i && selectedMovie.i.imageUrl}
          year={selectedMovie.y}
          rating={selectedMovie.q}
          genre={selectedMovie.genre || []}
          description={selectedMovie.s}
          onBackPress={handleBackPress}
        />
      ) : (
        <FlatList
          data={movies}
          renderItem={({ item }) => (
            <MovieCard
              key={item.id}
              image={item.i && item.i.imageUrl}
              title={item.l}
              year={item.y}
              description={item.s}
              onPress={() => handleMoviePress(item)}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    padding: 16,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 16,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
    color: "#fff",
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#888",
    marginRight: 8,
  },
  selectedFilterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: "#3f51b5",
    marginRight: 8,
  },
  filterButtonText: {
    fontSize: 14,
    color: "#fff",
  },
});

export default HomeScreen;

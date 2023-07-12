import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import axios from "axios";
import Header from "./components/Header";
import BottomBarNavigation from "./components/navigation/BottomBarNavigation";
import MovieDetail from "./components/MovieDetail";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://imdb8.p.rapidapi.com/auto-complete",
          {
            params: { q: "game of thrones" },
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
      }
    };

    fetchMovies();
  }, []);

  const handleMoviePress = (movie) => {
    setSelectedMovie(movie);
  };

  const handleBackPress = () => {
    setSelectedMovie(null);
  };

  return (
    <View style={styles.container}>
      <Header title="Movies" />

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
        <BottomBarNavigation
          movies={movies}
          handleMoviePress={handleMoviePress}
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
});

export default App;

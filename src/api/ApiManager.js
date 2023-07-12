import axios from 'axios';

const ApiManager = axios.create({
  baseURL: 'https://reqres.in/api/users?page=1',
  responseType: 'json',
  withCredentials: true,
  delayed: true,
});

ApiManager.interceptors.request.use((config) => {
  if (config.delayed) {
    return new Promise((resolve) => setTimeout(() => resolve(config), 100));
  }
  return config;
});

async function fetchMovies() {
  const options = {
    method: 'GET',
    url: 'https://imdb8.p.rapidapi.com/auto-complete',
    params: { q: 'game of thrones' },
    headers: {
      'X-RapidAPI-Key': '0651cb3b42msh3ce4f655964ec6ap16bd04jsn65b74045d4c3',
      'X-RapidAPI-Host': 'imdb8.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}

fetchMovies();

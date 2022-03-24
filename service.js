const axios = require("axios");

const dotenv = require("dotenv");
dotenv.config();

async function getSearchResults(searchKey) {
  const omdbBaseUrl = process.env.OMDB_URL;
  const omdbApiKey = process.env.OMDB_API_KEY;
  const url = `${omdbBaseUrl}/?apikey=${omdbApiKey}&s="${searchKey}"`;

  const { data } = await axios.get(url);
  const { Search: search } = data;

  const movies = search
    .filter((s) => s.Type === "movie")
    .map((s) => {
      return {
        title: s.Title,
        year: s.Year,
        id: s.imdbID,
        poster: s.Poster,
      };
    });

  return movies;
}

async function getMovieById(id) {
  const omdbBaseUrl = process.env.OMDB_URL;
  const omdbApiKey = process.env.OMDB_API_KEY;
  const url = `${omdbBaseUrl}/?apikey=${omdbApiKey}&i=${id}&plot=full`;

  const { data: movieDetails } = await axios.get(url);

  const review = await getNYTReviewLinks(movieDetails.Title, movieDetails.Year);

  const plotTranslation = await getYodaTranslation(movieDetails.Plot);

  const movieInfo = {
    title: movieDetails.Title,
    actors: movieDetails.Actors,
    plot: plotTranslation,
    awards: movieDetails.Awards,
    poster: movieDetails.Poster,
    rating: review.rating,
    openingDate: review.openingDate,
    publishDate: review.publishDate,
    reviewLink: review.reviewLink,
    linkText: review.linkText,
  };

  return movieInfo;
}

async function getNYTReviewLinks(name, year) {
  const nytBaseUrl = process.env.NY_TIMES_URL;
  const nytApiKey = process.env.NY_API_KEY;
  const dateRange = `${year}-01-01:${year}-12-31`;

  const url = `${nytBaseUrl}?opening-date=${dateRange}&query=${name}&api-key=${nytApiKey}`;
  const { data } = await axios.get(url);

  const reviews = data.results.map(async (r) => {
    return {
      rating: r.mpaa_rating,
      publishDate: r.publication_date,
      reviewLink: r.link.url,
      linkText: r.link.suggested_link_text,
      openingDate: r.opening_date,
    };
  });

  return reviews[0];
}

async function getYodaTranslation(text) {
  const body = {
    text,
  };
  const url = process.env.YODA_TRANSLATION_URL;

  let translatedText = text;

  try {
    const { data } = await axios.post(url, body);
    translatedText = data.contents.translated;
  } catch {
    // do nothing
  }

  return translatedText;
}

const service = {
  searchMovies: getSearchResults,
  getMovieInfo: getMovieById,
};

module.exports = service;

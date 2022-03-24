const axios = require("axios");

const dotenv = require("dotenv");
dotenv.config();

async function getSearchResults(searchKey) {
  const omdbBaseUrl = process.env.OMDB_URL;
  const omdbApiKey = process.env.OMDB_API_KEY;
  const url = `${omdbBaseUrl}/?apikey=${omdbApiKey}&s="${searchKey}"`;

  const { data } = await axios.get(url);
  const { Search: search } = data;

  return search;
}

async function getMovieInfo(name, year) {
  const review = await getNYTReviewLinks(name, year);
  const translated = await getYodaTranslation(review.summary);
  review.summary = translated;

  return review;
}

async function getNYTReviewLinks(name, year) {
  const nytBaseUrl = process.env.NY_TIMES_URL;
  const nytApiKey = process.env.NY_API_KEY;
  const dateRange = `${year}-01-01:${year}-12-31`;

  const url = `${nytBaseUrl}?opening-date=${dateRange}&query=${name}&api-key=${nytApiKey}`;
  const { data } = await axios.get(url);

  const reviews = data.results.map((r) => {
    return {
      title: r.display_title,
      rating: r.mpaa_rating,
      summary: r.summary_short,
      publishDate: r.publication_date,
      openingDate: r.opening_date,
      reviewLink: r.link.url,
    };
  });

  return reviews[0];
}

async function getYodaTranslation(text) {
  const body = {
    text,
  };
  const url = process.env.YODA_TRANSLATION_URL;
  const { data } = await axios.post(url, body);
  return data.contents.translated;
}

const service = {
  searchMovies: getSearchResults,
  getMovieInfo: getMovieInfo,
};

module.exports = service;

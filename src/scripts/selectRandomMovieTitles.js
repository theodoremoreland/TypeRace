import movieTitles from "../data/movie-titles.js";

/**
 * Returns a randomized list of 6 movie titles
 */
export default () => {
    const randomMovieTitles = [];

    for (let i = 0; i < 6; i++) {
        let randomIndex = Math.floor(Math.random() * movieTitles.length);
        let randomTitle = movieTitles[randomIndex].name;

        while (randomMovieTitles.includes(randomTitle)) {
            randomIndex = Math.floor(Math.random() * movieTitles.length);
            randomTitle = movieTitles[randomIndex].name;
        }

        randomMovieTitles.push(randomTitle);
    }

    return randomMovieTitles;
}
import jadenSmithTweets from "../data/jaden-smith-tweets";

/**
 * Returns a randomized list of 6 quotes from Jaden Smith's Twitter
 */
export default () => {
    const randomJadenSmithTweets = [];

    for (let i = 0; i < 6; i++) {
        let randomIndex = Math.floor(Math.random() * jadenSmithTweets.length);
        let randomJadenSmithTweet = jadenSmithTweets[randomIndex];

        while (randomJadenSmithTweets.includes(randomJadenSmithTweet)) {
            randomIndex = Math.floor(Math.random() * jadenSmithTweets.length);
            randomJadenSmithTweet = jadenSmithTweets[randomIndex];
        }

        randomJadenSmithTweets.push(randomJadenSmithTweet);
    }

    return randomJadenSmithTweets;
}
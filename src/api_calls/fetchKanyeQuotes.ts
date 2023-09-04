export const fetchKanyeQuotes = async () => {
    const randomKanyeQuotes = [];

    do {
        const response = await fetch('https://api.kanye.rest');
        const json = await response.json();
        const kanyeQuote = json.quote;

        if (!randomKanyeQuotes.includes(kanyeQuote)) {
            randomKanyeQuotes.push(kanyeQuote);
        }
    } while (randomKanyeQuotes.length < 3);
    
    return randomKanyeQuotes;
};
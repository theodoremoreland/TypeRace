export const fetchKanyeQuotes = async () => {
    let randomKanyeQuotes = [];

    do {
        let response = await fetch('https://api.kanye.rest');
        let json = await response.json();
        let kanyeQuote = json.quote;

        if (!randomKanyeQuotes.includes(kanyeQuote)) {
            randomKanyeQuotes.push(kanyeQuote);
        }
    } while (randomKanyeQuotes.length < 3);
    
    return randomKanyeQuotes;
};
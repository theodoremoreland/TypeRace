export const fetchRandomQuotes = async () => {
    const randomizedQoutes = [];
    
    do {
      const response = await fetch('https://api.quotable.io/random');
      const json = await response.json();
      const quote = json.content;

      if (!randomizedQoutes.includes(quote)) {
        randomizedQoutes.push(quote)
      }

    } while (randomizedQoutes.length < 3);

    return randomizedQoutes;
};
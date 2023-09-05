export const fetchRandomQuotes = async (): Promise<string[]> => {
    const randomizedQuotes: string[] = [];
    
    do {
      const response: Response = await fetch('https://api.quotable.io/random');
      const json = await response.json();
      const quote = json.content;

      if (!randomizedQuotes.includes(quote)) {
        randomizedQuotes.push(quote);
      }

    } while (randomizedQuotes.length < 3);

    return randomizedQuotes;
};
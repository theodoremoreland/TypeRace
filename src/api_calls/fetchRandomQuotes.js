export const fetchRandomQuotes = async () => {
    let randomizedQoutes = [];
    
    do {
      let response = await fetch('https://api.quotable.io/random');
      let json = await response.json();
      let quote = json.content;

      if (!randomizedQoutes.includes(quote)) {
        randomizedQoutes.push(quote)
      }

    } while (randomizedQoutes.length < 3);

    return randomizedQoutes;
};
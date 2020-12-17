export const fetchFilmNames = async () => {
    const response = await fetch('https://ghibliapi.herokuapp.com/films');    
    const json = await response.json();
    let randomizedfilms = [];

    for (let i = 0; i < 5; i++) {
      let random = Math.floor(Math.random() * json.length);
      let film = json[random].title;
      if (!randomizedfilms.includes(film)) {
        randomizedfilms.push(film)
      }
      else {
        i--;
      }
    };

    return randomizedfilms;
};
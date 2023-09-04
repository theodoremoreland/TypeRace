export const fetchFilmNames = async () => {
    const response = await fetch('https://ghibliapi.herokuapp.com/films');    
    const json = await response.json();
    const randomizedFilms = [];

    for (let i = 0; i < 5; i++) {
      const random = Math.floor(Math.random() * json.length);
      const film = json[random].title;

      if (!randomizedFilms.includes(film)) {
        randomizedFilms.push(film)
      }
      else {
        i--;
      }
    }

    return randomizedFilms;
};
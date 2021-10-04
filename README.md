# Type Race
A React web page that tracks how long it takes the user to type a selected text snippet. The user can choose between snippets of three categories: movie titles, random quotes, and quotes from Kanye West / Jaden Smith. The app randomly selects 3-6 snippets for each category subsequently allowing the user to receive a new batch upon refreshing the web page.

The application attempts to retreive each category of text snippet dynamically via REST API request(s). The application will use static data upon failure to retreive data from corresponding GET request, for example: Kanye West quotes are replaced with Jaden Smith tweets if the application fails to retreive Kanye's quotes.

### Technologies Used
* React.js
* JavaScript (ES6)
* HTML5
* CSS3
* ~~Semantic UI~~ (replaced with custom CSS)

# Data sources / credits
- Source of movie titles: https://ghibliapi.herokuapp.com/films
- Source of quotes (deprecated): https://api.quotable.io/random
- Source of Kanye West quotes: https://api.kanye.rest
- Source of fallback movie list: https://gist.github.com/shaikh-shahid/f29703bf7e7dc37183d5
- Source of fallback quotes: https://type.fit/api/quotes
- Source of fallback for Kanye West quotes (i.e. Jaden Smith tweets): https://github.com/pcarn/hubot-jaden/blob/master/src/jaden.coffee

### Future improvements
- Improved error handling on rejected API call
- Caching and / or static fallback data for failed and faster loads
- Abstract component logic into controllers where applicable
- Write some unit tests
- Update UI/UX to better communicate workflow and how to play

# Screenshots

## Default view (Galaxy Fold emulation)
<img src="presentation/1.PNG" width="250">

## After selecting random quotes as genre and scrolling down to view snippets (Galaxy Fold emulation)
<img src="presentation/2.PNG" width="250">

## After choosing a random snippet and beginning type race (Galaxy Fold emulation)
<img src="presentation/3.PNG" width="250">

## After completing type race (Galaxy Fold emulation)
<img src="presentation/4.PNG" width="250">

## Default view prior to selecting Kanye West quotes
<img src="presentation/5.PNG" width="800">

## Prior to selecting a Kanye West quote
<img src="presentation/6.PNG" width="800">

## After selecting a Kanye West quote and starting type race
<img src="presentation/7.PNG" width="800">

## After completing type race
<img src="presentation/8.PNG" width="800">

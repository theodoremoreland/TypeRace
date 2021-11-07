# Type Race
A React web page that tracks how long it takes the user to type a selected text snippet. The user can choose between snippets of three categories: movie titles, random quotes, and quotes from Kanye West / Jaden Smith. The app randomly selects 3-6 snippets for each category subsequently allowing the user to receive a new batch upon refreshing the web page.

The application attempts to retreive each category of text snippet dynamically via REST API request(s). The application will use static data upon failure to retreive data from corresponding GET request, for example: Kanye West quotes are replaced with Jaden Smith tweets if the application fails to retreive Kanye's quotes.

### Technologies Used
* React.js
* JavaScript (ES6)
* HTML5
* CSS3
* ~~Semantic UI~~ (replaced with custom CSS)

### Quality of life features
- Clicking on a snippet genre automatically scrolls to the bottom of the page thus putting snippets in view.
- Selecting a snippet automatically scrolls the user to the top of the textarea and focuses on the textarea thus enabling the user to start typing immediately.
- Chosen text snippet appears as grey text in the textarea. Characters typed by the user is then overlayed over the grey text thus providing clear visual of the accuracy of the characters typed.
- Pressing enter is treated the same as pressing a space thus users can choose to press enter to align their overlayed text with the snippet in the textarea immediately or continue typing without pressing enter such that the text wraps to a new line automatically. This allows the player to choose whatever style comes more naturally.
- Deleting any character after the game ends will automatically clear the textarea and reset the game thus providing an easy way to restart the game (i.e. the player doesn't have to reload the page or re-select another snippet).

### Data sources / credits
- Source of movie titles: https://ghibliapi.herokuapp.com/films
- Source of quotes (deprecated): https://api.quotable.io/random
- Source of Kanye West quotes: https://api.kanye.rest
- Source of fallback movie list: https://gist.github.com/shaikh-shahid/f29703bf7e7dc37183d5
- Source of fallback quotes: https://type.fit/api/quotes
- Source of fallback for Kanye West quotes (i.e. Jaden Smith tweets): https://github.com/pcarn/hubot-jaden/blob/master/src/jaden.coffee

### Future improvements
- Abstract component logic into controllers where applicable
- Write some unit tests

# Screenshots

## Default view (Galaxy Fold emulation)
<img src="presentation/1.PNG" width="250">

## After selecting random quotes as genre, application automatically scrolls down (Galaxy Fold emulation)
<img src="presentation/2.PNG" width="250">

## After choosing a random snippet and beginning type race (Galaxy Fold emulation)
<img src="presentation/3.PNG" width="250">

## Mid game. Typed characters (pink) overlay selected snippet (grey) - (Galaxy Fold emulation)
<img src="presentation/4.PNG" width="250">

## After completing type race. Displays time in milliseconds and words per minute (Galaxy Fold emulation)
<img src="presentation/4-2.PNG" width="250">

## Default view (Desktop)
<img src="presentation/5.PNG" width="800">

## After selecting random quote genre. Automatically scrolls down (Desktop)
<img src="presentation/6.PNG" width="800">

## After selecting a random quote and starting type race (Desktop)
<img src="presentation/7.PNG" width="800">

## Mid game. Typed characters (pink) overlay selected snippet (grey) - (Desktop)
<img src="presentation/8.PNG" width="800">

## After completing type race. Displays time in milliseconds and words per minute (Desktop)
<img src="presentation/9.PNG" width="800">

# Type Race
A web page that tracks how long it takes the user to type a selected text snippet. 

The application attempts to retrieve each text snippet dynamically via REST API request(s). The application will use static data upon failure to retrieve data from corresponding GET request.

### Technologies Used
* React.js
* TypeScript
* HTML5
* CSS3
* Vite
* TanStack / React Query

### Quality of life features
- Clicking on a snippet genre automatically scrolls to the bottom of the page thus putting snippets in view.
- Selecting a snippet automatically scrolls the user to the top of the textarea and focuses on the textarea thus enabling the user to start typing immediately.
- Chosen text snippet appears as grey text in the textarea. Characters typed by the user are then overlayed (in pink) over the grey text, thus providing clear visual on the accuracy of the characters typed.
- For text that wraps to a new line in the textarea (due to having too many words to fit on one line), the game treats "Enter" the same as a "Space". This allows the user to decide whether or not they want to move their typing cursor to a new line manually or let the game do it automatically.
- Deleting any character after the game ends will automatically clear the textarea and reset the game thus providing an easy way to restart the game (i.e. the player doesn't have to reload the page or re-select another snippet).

### Data sources / credits
- Source of quotes (deprecated): https://api.quotable.io/random
- Source of fallback quotes: https://type.fit/api/quotes

### Future improvements
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

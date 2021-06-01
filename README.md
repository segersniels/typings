# typings.space 🚀

typings.space is a simplistic interpretation of a pleasing typing test 👋

## Features

- Pressing ESC (escape) resets the entire test
- Live WPM overview during test
- History of the last 10 recorded tests
- Tooltips when hovering over incorrect words to show what was typed instead of the word

## Calculation of WPM

The current calculation assumes that the average word is 5 characters long. This causes longer words to be weighted more than eg. typing _my_.

So this roughly translated to the following equation:
- Filter correct words
- All the characters of all correct words are divided by 5 to get a weighted word count
- This is then divided by the total time spent typing all of the words (incl. incorrect words)

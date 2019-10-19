# Bet Extension

This is a chrome extension that find your bets from [unibet](https://www.unibet.com) to _follow_ the score on [sofascore](https://www.sofascore.com).
This extension is not made to be publish in the store, later more cool stuff will be done to analyze your own betting stats from your server.

## Install

```
npm install
npm build
```

Setup your chrome in developper mode and follow the [google instructions](https://support.google.com/chrome/a/answer/2714278?hl=en).

## How to use

1. Go to your unibet history page
2. Refresh the page (the data is scrape from that page)
3. Go to your sofascore page from witch you have games that you will be following
4. Refresh the page
5. The page will take a little longer and you will see a dialog box resuming which games has been followed considering the bet it registers.

## Features

- Get data from your unibet history
- Follow the game your page corresponding to your bets (only tennis)

## TODO

Top priority (v1):

- clean code / create class / abstraction
  - unibet - DONE
  - sofascore - IN PROGRESS
  - background
- handle different sports (only work for tennis at the moment)
- display some stats about your bets from the extension
- graphical animation to inform that data has been stored (on unibet)
- a more user friendly display to inform the bet followed (on sofascore)

Second priority (v2):

- remember bets that has been register to not re do the actions (storing and follow)
- directly go to sofascore page when it found bets not register

## Acknowledgments

This work is inspired by [Extensionizr](https://github.com/altryne/extensionizr/), and the icons in `dist/icons` remain under the Extensionizr license.

This work has been setup with the boilerplate from [duo-labs](https://github.com/duo-labs/chrome-extension-boilerplate)

<a name="readme-top"></a>

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/abedmohammed/f1scoreboard">
    <img src="https://github.com/abedmohammed/f1scoreboard/blob/main/src/assets/images/f1logo.png" alt="Logo" width="100" height="40">
  </a>

<h1 align="center">F1 Scoreboard</h1>

  <p align="center">
    F1Scoreboard is a React-based website that provides live F1 racing data and updates, including driver and team rankings, sourced from multiple external data sources.
    <br />
    <br />
    <a href="https://f1scoreboard.com/">f1scoreboard.com</a>
  </p>
</div>


<!-- Preview -->
## 📷 Preview
[<img src="https://github.com/abedmohammed/f1scoreboard/assets/72363970/4c06c454-419a-492b-90e1-15ef0b804e9a" alt="Screenshot to demo the site">](https://f1scoreboard.com/)

### 👩‍💻 Built With

[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)](https://reactrouter.com/en/main)
[![SASS](https://img.shields.io/badge/SASS-hotpink.svg?style=for-the-badge&logo=SASS&logoColor=white)](https://sass-lang.com/)

<br />

<!-- Showcase -->
## 👨‍🏫 Showcase

You can visit the website and use the chat at [https://f1scoreboard.com/](https://f1scoreboard.com/)

### Races' Information

<img align="center" src="https://github.com/abedmohammed/f1scoreboard/assets/72363970/7e3abddb-9d02-4e05-90f8-b58e31ed4062" alt="Races page of the website">

<br />

<br />

<img align="center" src="https://github.com/abedmohammed/f1scoreboard/assets/72363970/56aa9738-7f11-4d8c-9e55-d6e54ba5c623" alt="Races page of the website showing race results and map">

<br />

<br />

🔴 The home page displays the next latest race with location information and the time of each event. In the "Races" page, a list of all races in the current season is available. Each race is accompanied with a map showing the location of the race and tables for displaying the results of each event.

<br />

### Drivers' and Constructors' Information

<img align="center" src="https://github.com/abedmohammed/f1scoreboard/assets/72363970/eae7b13b-eff6-4b3c-b8a0-ef019d9d5f46" alt="Constructors page displaying all of the teams">

<br />

<br />

<img align="center" src="https://github.com/abedmohammed/f1scoreboard/assets/72363970/483c0bf4-bfd1-4b9f-ab52-073c9d5922a9" alt="Max Verstappen driver information">

<br />

<br />

🔴 The "Standings" page has a table style format to display the list of each driver and their total points as well as the list of each team. The individual "Driver" and "Constructors" pages have a display of each driver and team in a card like format. Each card can be clicked on to display more information about the driver or team.

<br />

<br />

<!-- ACKNOWLEDGMENTS -->
## 🛠 Tools and Development

This project was built around React and the [react-router](https://reactrouter.com/en/main) library. The goal of this project was to improve my skills in working with RESTful API's as well as explore a different method of fetching data with the react-router loaders. I also constantly get lost trying to find F1 race times so this is something I actually have a use for. 

### ☕ API

This project was initially supposed to work around the [Ergast Developer API](http://ergast.com/mrd/) which sends up-to-date F1 race and standing data. Most of the data and listings come from this API, however, I was still missing key information and elements.

Since I display the flags for each driver in multiple places around the site, I created `CountriesContext.js` which allows me to get the flags and nationalities of any driver using their demonyms (Ergast API only returned the demonym of each driver, such as "Dutch" or "German"). Since I would have to loop through each country to retrieve country data from the demonyms, I opted to using a context as that information would only have to be loaded through once per page.

For the specific driver and contructor page, the Ergast API also lacked some more detailed information that I would of liked to display. Such as the number of career points, total wins, grand prix's entered, etc. The only source I was able to find to retrieve this data was through wikipedia. Using the[ MediaWiki Action API](https://www.mediawiki.org/wiki/API:Main_page), I constructed a hook which retrieved the infobox data (the rectangle on the right side of wikipedia articles) from any wikipedia page based on the title in the infobox. 

To fetch this data, I used react-router's new v6 loaders. As explained [here](https://reactrouter.com/en/main/route/loader): "As the user navigates around the app, the loaders for the next matching branch of routes will be called in parallel and their data made available to components through useLoaderData". This made it extremely easy to handle data loading and handle transitions as well as errors.

### 💅 Sass

I have tried multiple Sass folder structures in the past but after some research I have found a system that works really well for me. This is using a modified 7-in-1 structure that uses Sass' new `@forward` and `@use` imports. The structure kept my scss very organized, minimized reused code, but still allowed me to modify or make unique elements. More on this structure here: [A Modern Sass Folder Structure](https://dev.to/dostonnabotov/a-modern-sass-folder-structure-330f).

I used to always use 62.5% html font-size trick however after [this read](https://fedmentor.dev/posts/rem-html-font-size-hack/) I have decided to use another method for my rem units. Using this scss function, I am able to call `rem(##px)` anywhere as a substitute for calculating the rem units myself. This function automatically takes in any pixel amount and converts it to rem, all while being visually self-explanatory to any other developers.

```
@use "sass:math";

@function rem($size) {
  $remSize: math.div($size, 16px);
  @return #{$remSize}rem;
}
```

<br />
<br />

<div align="center">
  Mohammed Abed 💠 abedmohammed353@gmail.com 💠 https://github.com/abedmohammed
</div>

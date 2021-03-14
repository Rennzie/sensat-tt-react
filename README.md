# Sensat Tech Test by Sean Rennie

> ✨ Bootstrapped with Create Snowpack App (CSA).

Submission for role as frontend or fullstack engineer at Sensat. See scripts and getting started to run the project on a local environment.

## Getting started

At a minimum `node` v12 or higher is required. If need be install it with `npm`

Clone the repo:

```bash
git clone https://github.com/Rennzie/sensat-tt-react.git
```

Cd into the repo and run:

```bash
yarn install
```

Use the scripts below to interact with the project. A deployed version is available [here](https://rennzie.github.io/sensat-tt-react/).

## Available Scripts

### yarn start

Runs the app in the development mode.
Open <http://localhost:8080> to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.



## Design Decisions: 

### Libraries
  - `chart.js` 
    - A robust charting solution built on canvas
    - Out of the box charts
    - Active community
    - Quick to setup  
    - Down side: library is very large, documentation's challenging to parse
    - Alternatives: `visx`, 100s of other libraries
  - `leaflet & react-leaflet`: 
    - Mapping components
    - I'm most comfortable with this library. 
    - Its powerful and open source with a huge community. 
    - Down side: Easy to have performance issues
    - Alternatives: Mapbox, Open Layer, Google Maps
  - `date-fns`:
    - Date manipulation library
    - Easy use like `lodash`
    - Uses the native `Date` object making it a lighterweight alternative to `moment`
    - Down side: none I can think of.
    - Alternatives: Moment
  - `turf.js`:
    - Geospatial utility tools
    - Best in class javascript Geospatial library. 
    - Has utils and helpers for every use case
    - Modularised limiting impact on package size
    - Down sides: none
    - Alternatives: none
  - `chroma.js`
    - Colour manipulation library
    - Easy to use utility. 
    - documentation is simply to follow
    - Down sides: Function chaining can get convoluted
    - Alternatives: not aware of any

### Layout: 
  - Side by side table&vis simplifies reponsive needs.
  - Side by side allows for viewing table and visualisation at the same time
    - Table is in context when viewing vis
    - Toggling or overviews can get in the way
  - Used `CSS Grid` as it makes creating 2 dimensional layouts easy
    - Challenge can be making it stick to the bottom (used to much `position: absolute`)
    - Could have used flex-box. Down side is number of `wrapper` divs required for the same result

### What I left out: 
  - *Not sure if this refers to the extra tasks or the list of improvements below?*
  - I chose the tasks based on my strengths
  - Responsive design is time consuming
    - Easy to go down the rabbit hole
    - I doesn't highlight my core skills
  - Performance: The table should have >8000 results. To show them all and not kill the browser I'd have paginated the request or used virtualisation (windowing)
    - Left it out in favour of completing the extra tasks.
    - I've added comments in the code indicating where I'd use these techniques

### Things to be improved: 
*The list is non-exhaustive but rather what came to mind while working. The task was intricate meaning there are many ways to improve it.*

- Responsive Design: tablet & mobile
- Sorting by direction
- Clicking table item will re-zoom the map
- Hover on table item highlights reading on chart or marker on map
- CSS variables: common colours & sizing
- Better sanitisation of chart data: could even be a different chart type
- Props for setting columns in `LoadingRow`
- Use generic types in util functions
- Reusable map popups with better styling
- Styling of charts. 
# Getting MEAN

### :fire: Planning a real application

1. Planning screens
2. Dividing the screens into collections
3. Architecturing the application

| # | Choices |
|---|---|
| 1. | Node + Express |
| 2. | Node + Express with Angular for interactivity (hybrid)|
| 3. | Angular SPA |

### :hammer: Breaking the development into stages

**Stage 1: Building a static site**
  - To quickly figure out the layout
  - To ensure that the user flow makes sense

**Stage 2: Design the data model and create the database**
  - To define a data model that reflects the requirements of the application
  - To create a database to work with the model

**Stage 3: Build our data API**
  - To create a REST API that will allow our application to interact with the database

**Stage 4: Hook the database into the application**
  - To get our application to talk to our API

**Stage 5: Augment the application**
  - To add finishing touches to our application
  - To get the application ready for people to use

### :cyclone: Work flow

**Initialize the project**
  - Use `express-generator` package to create a new project by `$ express --ejs`
  - Modify the folder structure by adding models and controllers folders
  - Update views/routers folder location inside *app.js*
  - Add an *Procfile*

**Building a static site with Node and Express**
  - Sketch a table to define specific route for each screen, like the table below

| Collection | Screen | URL |
|---|---|---|
| Locations | List of locations(homepage) | / |
| Locations | Location details | /location |
| Locations | Location review form | /location/review/new |
| Others | About Loc8r | /about |

  - Set up routes and controllers

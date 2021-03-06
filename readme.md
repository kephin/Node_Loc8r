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
  - Add basic bootstrap for them
  - Sketches the desktop and mobile layout for the homepage **(Important!)**
  - Complete the static pages with hard code data
  - Move the data from views to controllers

**Building a data model with MongoDB and Mongoose**

*<Part 1> Config*

  - Connecting the Express application to MongoDB with Mongoose
    1. Install mongoose by `npm install mongoose --save`
    2. Creating server/config/mongoose.js
    3. Require it into app.js
  - Inside config/mongoose.js
    1. Creating mongoose connection by `mongoose.connect(PATH)`
    2. Monitoring the connections with `mongoose.connection.on()`
    3. Capturing the process termination events

*<Part 2> Models*

  - Define mongoose schema
  - Assign default
  - Add validations: required, boundaries(ex: max, min)...
  - MongoDB indexes
  - Using geograpic data
    1. index: 2dsphere
    2. Be aware of the order: (lng, lat)
  - Subdocuments: Using nested schemas
  - Exports the compiled schema, which is the model

*<Part 3> MongoDB shell*

  - List all local database: `$ show dbs`
  - Switch to a specific database: `$ use local`
  - List all collections: `$ show collections`
  - Find the content of the collection: `$ db.<collectionName>.find(<queryObject>)`
    + Return a formatted object: `$ db.<collectionName>.find(<queryObject>).pretty()`
  - Create a database: `$ use <name>`
  - Create/Update a collection and documents:

    ```shell
    $ db.locations.save({
      name: 'Kevin',
      age: 30,
    })
    
    $ db.locations.update({name:'Kevin'},{
      # $push: update operator for array
      $push:{
        blogs :{
          id: ObjectId(),
          creatdAt: new Date(),
          content: 'hello world',
        }
      }
    })
    ```

*<Part 4> Set up with Heroku*

Create and deploy Heroku:

  - Create the heroku application: `$ heroku create`
  - Deploy the application: `$ git push heroku master`
  - To open the URI in your browser: `$ heroku open`

Set up MongoLab:

  - Setting up MongoLab: `$ heroku addons:add mongolab`
  - Open it up: `$ heroku addons: open mongolab`
  - `$ heroku config:get MONGODB_URI` will returns URI:

    *mongodb://heroku_g1mhtt5l:em45s3k3r8s1g933jed1liamii@ds115411.mlab.com:15411/heroku_g1mhtt5l*
    
    | Component | Value |
    |---|---|
    | username | heroku_g1mhtt5l |
    | password | em45s3k3r8s1g933jed1liamii |
    | server address | ds115411.mlab.com |
    | port | 15411 |
    | database name | heroku_g1mhtt5l |

  - Use Robomongo to connect and view data

NODE_ENV

  - Use `$ heroku config` to view environment variables
  - Add environment variable: `$ heroku config:set NODE_ENV=production`
  - Set up database based on process.env.NODE_ENV

    ```javascript
    let dbURI = 'mongodb://localhost:27017/Loc8r';
    if (process.env.NODE_ENV === 'production') dbURI = process.env.MONGODB_URI;
    mongoose.connect(dbURI);
    ```

  - Run `$ NODE_ENV=production nodemon` in production and `$ nodemon` in development
  - Run `$ heroku logs` to make sure mongoose is connected

**RESTful API: Exposing the MongoDB to the application**

  - Include routes into app.js

    ```javascript
    const routesApi = require('./app_api/routes/index');
    app.use('/api', routesApi);
    ```
  - Define API routes
  - Move models files and mongoose config into app_api

Controllers:

  - Read the document: `findById(_id)`
    1. Using *req.params.id* from http://www.yourURL/:id
    2. Using *req.query.place* from http://www.yourURL/locations?place=taipei
  - Read the subdocument: `id()`
    1. Find parent document first and then use id()
    2. Limit the paths returned from mongoDB: select('name address reviews')
  - Find multiple documents by `geoNear()`
    1. Location.geoNear(point, options)
    2. Be aware to parseFloat() the req.query.lng and req.query.lat
    3. Code snippet:

      ```javascript
      const point = {
        type: 'Point',
        // lng first!!
        coordinates: [lng, lat],
      }
      const options = {
        spherical: true,
        // the unit is in meters
        maxDistance: parseFloat(req.query.maxDistance),
        // maximum number returned
        num: 10,
      }
      ```
    4. In geoNear() outputs, each object contains a dis property and a returned document
  - Create new document: `create()`
  - Create new subdocument
    1. Find the correct parent document
    2. Push the new subdocument into the parent
    3. Save the parent document
  - Update the document: `findByIdAndUpdate()`
  - Update the subdocument
  - Delete the document: `findByIdAndRemove()`
  - Delete the subdocument:

    ```javascript
    const location = Location.findById(_id);
    location.reviews.id(_id).remove();
    ```

**Using API from inside Express**

  - Install [axios](https://github.com/mzabriskie/axios) to call an API from Express
  - Set up server URL to the env variables

  ```javascript
  const env = process.env.NODE_ENV || 'development';
  if (env === 'development') process.env.SERVER = 'http://localhost:3000';
  ```
  - Use the API call to update the index, review... controller
  - Catch errors returned by the API
  - Use the moment.js package for display time
  - Update routes and views
  - Finally, add validations
    1. Schema level, using Mongoose before the datat is saved
    2. Application level, using Express before the data is posted to the API
    3. At the client side, using jQuery before the form is submitted


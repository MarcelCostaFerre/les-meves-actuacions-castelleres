// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require("dotenv").config();

// ℹ️ Connects to the database
require("./db");

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require("express");

// Handles the handlebars
// https://www.npmjs.com/package/hbs
const hbs = require("hbs");

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require("./config")(app);

const capitalize = require("./utils/capitalize");
const projectName = "les-meves-actuacions-castelleres";

app.locals.appTitle = `${capitalize(projectName)} created with IronLauncher`;

app.use(function(req, res, next) {
    if (req.session.currentUser) {
      res.locals.user = req.session.currentUser;
    }
    next();
  });

// 👇 Start handling routes here
const indexRoutes = require("./routes/index.routes");
app.use("/", indexRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/auth", authRoutes);

const actuacioRoutes = require("./routes/Actuacio.routes");
app.use("/actuacions", actuacioRoutes);

const commentRoutes = require("./routes/comment.routes");
app.use("/actuacions", commentRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require("./error-handling")(app);

// Browser Sync
const browserSync = require("browser-sync");

// Start the server
browserSync({
  proxy: "http://localhost:3000", // proxying the app domain
  open: false, 
  files: ['public', 'views'] // watching the following folders
});

module.exports = app;

//Loads the express module

import express from "express";
import ExpressHandlebars from "express-handlebars";

//Creates our express server
const app = express();
const PORT = process.env.PORT || 3000;

// Body Parser MiddleWare
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Gets handlebar // It says ExpressHandlebars is not function. Why?
//app.engine("handlebars", ExpressHandlebars());
//app.set("view engine", "handlebars");

//Sets a basic route
app.get("/", (req, res) => res.send("Hello from backend to frontend!"));


//Sets post route

app.post("/weather", (req, res) => {
  
  const city = req.body.cityName;

  if(!city){
    return res.status(400).json({msg: 'Please enter a city'})
  }

  res.json(city);
  console.log(city);
});

//Makes the app listen to port 3000
app.listen(PORT, () => console.log(`App listening to port ${PORT}`));

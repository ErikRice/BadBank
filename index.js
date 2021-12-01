import dotenv from 'dotenv'
import express from "express";
import cors from "cors";
import router from "./routes/account.js";
import path from 'path';


dotenv.config({ path: '.env'})

const app = express();
const options = { origin: "http://localhost:3000", methods: ["POST", "PUT"], allowedHeaders: ['Content-Type', 'Authorization'] };

app.use(express.json());
app.use(express.urlencoded({extended: true}));
  //heroku URL?

// app.use(express.static('public'));  // how to set up public in create react app
app.use("/account", cors(options), router);

const Port = process.env.PORT || 3080;

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'Front-end/build')));
  app.get('*', (_, res) => {
    res.sendFile(path.join(__dirname, 'Front-end/build', 'index.html'));
  })
}

app.listen(Port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Running on Port: ${Port}`);
});

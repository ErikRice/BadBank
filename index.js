import dotenv from 'dotenv'
import express from "express";
import cors from "cors";
import router from "./routes/account.js";
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


dotenv.config({ path: '.env'})

const app = express();
const options = { origin: "*", methods: ["POST", "PUT"], allowedHeaders: ['Content-Type', 'Authorization'] };

app.use(express.json());
app.use(express.urlencoded({extended: true}));


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

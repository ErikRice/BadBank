import express from "express";
import cors from "cors";
import router from "./routes/account.js";
const app = express();
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded());
app.use(cors({ methods: ["POST", "PUT"], origin: "http://localhost:3000" }));

// app.use(express.static('public'));  // how to set up public in create react app

app.use("/account", router);

const Port = 3080;

app.listen(Port, (err) => {
  if (err) {
    console.log(err);
  }
  console.log(`Running on Port: ${Port}`);
});

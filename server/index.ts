import "reflect-metadata";
import express from "express";
import { AppDataSource } from "./models";
import { Controller } from "./controllers";

const PORT = 8000;
const app = express();
const controller = new Controller(app);

// config
app.use(express.json());
process.on("uncaughtException", (err) => console.error(err));
AppDataSource.initialize().then().catch(err => console.error(err));


// routes
app.get("/", (req, res) => {
    res.send("Hello");
})
controller.init();


// run server
app.listen(PORT, () => {
    console.log(`Listen on http://127.0.0.1:${PORT}`);
});

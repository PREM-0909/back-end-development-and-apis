import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { inputCleaner, inputValidator } from "./middleware.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.redirect("/form");
});

app.get("/form", (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.post("/submit", inputCleaner, inputValidator, (req, res) => {
    res.send(`${req.body.username}, ${req.body.comment}`);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
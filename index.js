/* Requires */

// Dependencies
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

if (process.env.NODE_ENV === "development") require("dotenv").config();

/* Init */

const PORT = process.env.PORT || 5000;
const app = express();

/* DB Connection */

mongoose
    .connect(process.env.MONGO_URI, {
        useUnifiedTopology: true,
    })
    .then(() => console.log("DB connected"))
    .catch((err) => console.log("Failed to connect to the database", err));

/* Middlewares */

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* Routes */

/* Serve static assets if in production */

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

/* Centralized Error Handling */

app.use(require("./middlewares/error.middleware"));

/* Server Listening */

app.listen(PORT, () => console.log(`server listening on port: ${PORT}`));

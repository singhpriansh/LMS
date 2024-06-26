const path = require("path");
const express = require('express');
// const mongoose = require("mongoose");
const app = express();

const apiroute = require("./routes/api");
const mongodb = require("./controllers/mongodb/database");

mongodb.connect();
// mongoose.connect("mongodb+srv://mongodb:3nYH8uOZTozuTNK8@cluster0.c7q1k.mongodb.net/LMS?retryWrites=true&w=majority")
// // mongoose.connect("mongodb+srv://priyanshu:"+process.env.Mongo_atls_pss+"@cluster0.c7q1k.mongodb.net/LMS?retryWrites=true&w=majority")
//     .then(() => {
//         console.log('Connected to the database!')
//     })
//     .catch(() => {
//         console.log('Connection failed!')
//     });

app.use(express.urlencoded({ extended: true ,limit: '50mb'}));
app.use(express.json({limit: '50mb'}));

app.use((req, res, next) => {
    res.setHeader(
        "Access-Control-Allow-Origin",
        "*"
        );
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PATCH, PUT, DELETE, OPTIONS"
        );
    next();
});

// app.use((req, res, next) => {
//     next();
// });

// app.use("/images", express.static(path.join("backend/images")));
// app.use("/document", express.static(path.join("backend/document")));
app.use("/api", apiroute);

module.exports = app;
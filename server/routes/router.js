require("dotenv").config();
const express = require("express");
const router = new express.Router();
const mongoose = require('mongoose');
const TODO = require("../DB/TODODB")

mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("connected");
}).catch((err) => {
    console.log(err);
})

router.post("/addtodo", async (req, res) => {
    let result = req.body

    const connect = new TODO({
        Name: result.Name,
        Title: result.Title,
        Description: result.Description,
        DueDate: result.DueDate,
        Status: result.Status,
    })
    connect.save().then(savedDocument => {
        res.send({ data: "TODO added" })
    })
        .catch(err => {
            res.send({ data: "err" })
        });
})

router.get("/fetchtodos/:name", async (req, res) => {
    let name = req.params.name
    try {
        const TODOS = await TODO.find({ "Name": name });
        res.send({ status: "OK", data: TODOS })
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
})

router.post("/updatetodo", async (req, res) => {
    let result = req.body

    const update = async (_id, result) => {
        try {
            const resp = await TODO.updateOne({
                _id
            }, {
                $set: {
                    Title: result.Title,
                    Description: result.Description,
                    DueDate: result.DueDate,
                    Status: result.Status
                }
            })
            res.send({ data: "Changes made successfully" })

        } catch (error) {
            console.log(error);
        }
    }

    update(result._id, result)
})

router.post("/deletetodo", async (req, res) => {
    let result = req.body

    const deletetodo = async (_id) => {
        try {
            const resp = await TODO.deleteOne({ _id })
            res.send({ data: "Deleted successfully" })

        } catch (error) {
            console.log(error);
        }
    }

    deletetodo(result._id)
})


module.exports = router;
"use strict"

var express = require("express");
var router = express.Router();

var _ = require("lodash");
var taskData = [];

function show404(res) {
    res.status(404).send("Oops, can't find that!");
}

function show403(res) {
    res.status(403).send("Forbidden");
}

function show500(res) {
    res.status(500).send("Something went wrong");
}

router
    .route("/tasks")
    .get(function (req, res) {
        res.send(taskData);
    })
    .post(function (req, res) {
        let task = req.body.task;
        if (!taskData.includes(task)) {
            taskData.push(req.body.task);
            res.send("Post tasks" + taskData);
        } else { show403(res); }
    })
    .put(function (req, res) {
        show403(res);
    })
    .delete(function (req, res) {
        show403(res);
    });

router
    .route("/tasks/:id")
    .get(function (req, res) {
        let id = req.params.id;
        if (taskData.length > id) {
            res.send(taskData[req.params.id]);
        } else { show403(res); }
    })
    .put(function (req, res) {
        let task = req.body.task;
        let id = req.params.id;
        if (taskData.length > id) {
            taskData[id] = task;
            res.send("Put tasks" + taskData);
        } else { show403(res); }
    })
    .post(function (req, res) {
        show403(res);
    })
    .delete(function (req, res) {
        let id = req.params.id;
        if (taskData.length > id) {
            taskData.splice(id, 1);
            res.send("Delete tasks" + taskData);
        } else { show403(res); }
    });

router.get("/tasks/:id/edit", function (req, res) {
    res.send(req.params.id + "edit");
});

module.exports = router;
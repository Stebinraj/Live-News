const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const topHeadlines = require('../newsData/topHeadlines.json');
const business = require('../newsData/business.json');
const entertainment = require('../newsData/entertainment.json');
const health = require('../newsData/health.json');
const science = require('../newsData/science.json');
const sports = require('../newsData/sports.json');
const technology = require('../newsData/technology.json');

router.post('/api/topheadlines', (req, res) => {
    try {
        const token = jwt.verify(req.body.token, process.env.JWT_TOKEN);
        if (token) {
            res.status(200).send({ token, topHeadlines });
        }
    } catch (error) {
        res.send(error);
        return;
    }
});

router.post('/api/business', (req, res) => {
    try {
        const token = jwt.verify(req.body.token, process.env.JWT_TOKEN);
        if (token) {
            res.status(200).send({ token, business });
        }
    } catch (error) {
        res.send(error);
        return;
    }
})

router.post('/api/entertainment', (req, res) => {
    try {
        const token = jwt.verify(req.body.token, process.env.JWT_TOKEN);
        if (token) {
            res.status(200).send({ token, entertainment });
        }
    } catch (error) {
        res.send(error);
        return;
    }
})

router.post('/api/health', (req, res) => {
    try {
        const token = jwt.verify(req.body.token, process.env.JWT_TOKEN);
        if (token) {
            res.status(200).send({ token, health });
        }
    } catch (error) {
        res.send(error);
        return;
    }
})

router.post('/api/science', (req, res) => {
    try {
        const token = jwt.verify(req.body.token, process.env.JWT_TOKEN);
        if (token) {
            res.status(200).send({ token, science });
        }
    } catch (error) {
        res.send(error);
        return;
    }
})

router.post('/api/sports', (req, res) => {
    try {
        const token = jwt.verify(req.body.token, process.env.JWT_TOKEN);
        if (token) {
            res.status(200).send({ token, sports });
        }
    } catch (error) {
        res.send(error);
        return;
    }
})

router.post('/api/technology', (req, res) => {
    try {
        const token = jwt.verify(req.body.token, process.env.JWT_TOKEN);
        if (token) {
            res.status(200).send({ token, technology });
        }
    } catch (error) {
        res.send(error);
        return;
    }
})

module.exports = router;
const express = require('express');
const router = express.Router();

const topHeadlines = require('../newsApi/topHeadlines.json');

router.get('/api/topheadlines', (req, res) => {
    res.send(topHeadlines);
})

module.exports = router;
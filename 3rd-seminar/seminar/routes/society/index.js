const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {
    res.status(200).send('사회 뉴스!')
})

module.exports = router

const express = require('express')
const router = express.Router()

const usersRouter = require('./users')
const societyRouter = require('./society')
const rankingRouter = require('./ranking')
const membersRouter = require('./members')

router.use('/users', usersRouter)
router.use('/society', societyRouter)
router.use('/ranking', rankingRouter)
router.use('/members', membersRouter)

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
})

module.exports = router

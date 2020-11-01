const crypto = require('crypto')
const express = require('express')
const router = express.Router()
const util = require('../../modules/util')
const responseMessage = require('../../modules/responseMessage')
const statusCode = require('../../modules/statusCode')
const usersDB = require('../../modules/users')

router.post('/signup', (req, res) => {
    const { id, password } = req.body
    if (!id || !password) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE))
    }

    const alreadyUser = usersDB.find(user => user.id === id)
    if (alreadyUser) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.ALREADY_ID))
    }

    const salt = crypto.randomBytes(64).toString('base64')
    const encryptedPwd = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('base64')

    const user = {
        id,
        password: encryptedPwd,
        salt
    }
    usersDB.push(user)
    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_UP_SUCCESS, id))
})

router.post('/signin', (req, res) => {
    const { id, password } = req.body
    if (!id || !password) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NULL_VALUE))
    }
    const alreadyUser = usersDB.find(user => user.id === id)
    if (!alreadyUser) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.NO_USER))
    }
    
    const { salt, password: encryptedPwd } = alreadyUser
    const newEncryptedPwd = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('base64')
    if (newEncryptedPwd !== encryptedPwd) {
        return res.status(statusCode.BAD_REQUEST).send(util.fail(statusCode.BAD_REQUEST, responseMessage.MISS_MATCH_PW))
    }
    return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.SIGN_IN_SUCCESS, id))
})

router.get('/', (req, res) => {
  return res.status(statusCode.OK).send(util.success(statusCode.OK, responseMessage.MEMBER_READ_ALL_SUCCESS, usersDB))
})

module.exports = router
// fs 모듈을 이용하여 비동기적으로 비밀번호 암호화하기
// (암호화된 문자열을 파일에 write 하면 됩니다!)
const fs = require('fs')
const crypto = require('crypto')

const encryptPassword = (pwd) => {
    const salt = crypto.randomBytes(64).toString('base64')
    const encryptedPwd = crypto.pbkdf2Sync(pwd, salt, 100000, 64, 'sha512').toString('base64')
    return encryptedPwd
}

const fileName = 'password.txt'
const password = 'soptjjangjjang123@@'
const encryptedPwd = encryptPassword(password)

fs.writeFile(fileName, encryptedPwd, () => {
    console.log(`Write at ${fileName}`)
})
const members = require('./member')
const getFemale = members => {
    return new Promise((resolve, __) => {
        setTimeout(() => {
            resolve(members.filter(m => m.gender === '여'))
        }, 500)
    })
   }
const getYB = members => {
    return new Promise((resolve, __) => {
        setTimeout(() => {
            resolve(members.filter(m => m.status === 'YB'))
        }, 500)
    })
}
const getiOS = members => {
    return new Promise((resolve, __) => {
        setTimeout(() => {
            resolve(members.filter(m => m.part === 'iOS'))
        }, 500)
    })
}
getFemale(members)
    .then(v => getYB(v))
    .then(v => getiOS(v))
    .then(v => console.log(v))
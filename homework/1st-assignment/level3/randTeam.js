const members = require('./member')
const OBmembers = members.filter(m => m.status === 'OB')
const YBmembers = members.filter(m => m.status === 'YB')

const getRandArray = (length) => {
    const randArr = [...Array(length).keys()]
    randArr.forEach((_, idx) => {
        const randIdx = Math.floor(Math.random() * length)
        const temp = randArr[idx]
        randArr[idx] = randArr[randIdx]
        randArr[randIdx] = temp
    })
    return randArr
}

const shuffle = (arr) => {
    const { length } = arr
    const randArr = getRandArray(length)
    return arr.map((_, idx) => arr[randArr[idx]])
}

const assignTeams = (teamNum, mems) => {
    const shuffledMems = shuffle(mems)
    shuffledMems.forEach((mem, idx) => {
        const teamNumber = (idx % teamNum) + 1
        mem.team = teamNumber
    })
    return shuffledMems
}

const makeTeams = (teamNum) => {
    const shuffledOBs = assignTeams(teamNum, OBmembers)
    const shuffledYBs = assignTeams(teamNum, YBmembers)
    const result = []
    for (let i=1; i<=teamNum; i++) {
        const condition = m => m.team === i
        const OBmembersOfTeam = shuffledOBs.filter(condition)
        const YBmembersOfTeam = shuffledYBs.filter(condition)
        const team = [...OBmembersOfTeam, ...YBmembersOfTeam]
        result.push(team)
    }
    return result
}

console.log(makeTeams(6))

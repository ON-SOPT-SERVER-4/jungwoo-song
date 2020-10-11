const level2 = require('./level2.json')

const printMember = () => {
    const { members } = level2.data
    members.forEach(member => {
        const { name, address, age, hobby } = member
        console.log(`이름 : ${name}\n거주지: ${address}\n나이: ${age}\n취미: ${hobby}\n\n`)
    })
}

printMember()


const express = require('express')
const data = require('./data.json')
const fs = require('fs')

const app = express()

const getAuthorDataClosure = (polls) => (author) => 
    polls.filter(poll => poll.author === author )

// Example of Function Currying    
// const getAuthorPolls = getAuthorDataClosure(data.polls)
 
const addPoll = (data) => (newPoll) => {
    const newPolls = data.polls.concat(newPoll);
    console.log(Object.assign(data, { polls: newPolls }))
    fs.writeFileSync("./data.json", JSON.stringify(Object.assign(data, { polls: newPolls }), null, 2), 'utf-8')
}

app.get('/', (req, res) => res.send(data))

addPoll(data) ({ 
    "title": "ML frameworks",
    "author": "Elon Musk",
    "options": [
        {
            "option": "Python",
            "votes": 3
        },
        {
            "option": "R",
            "votes": 1
        }
    ]
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))
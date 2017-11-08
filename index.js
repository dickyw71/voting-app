const express = require('express')
const data = require('./data.json')
const app = express()

const getAuthorPollData = (polls, author) => polls.filter(poll => poll.author === author )
const getAuthorDataGlobal = (author) => data.polls.filter(poll => poll.author === author )

const getAuthorDataClosure = (polls) => (author) => 
    polls.filter(poll => poll.author === author )

const getAuthorPolls = getAuthorDataClosure(data.polls)
    
app.get('/', (req, res) => res.send(data))

console.log("2 Params:", JSON.stringify(getAuthorPollData(data.polls, "Will White")))
console.log("1 Param + Global:", JSON.stringify(getAuthorDataGlobal("Will White")))
console.log("Closure + 1 Param", JSON.stringify(getAuthorDataClosure(data.polls)("Will White")))

console.log("Fully curried", JSON.stringify(getAuthorPolls("Will White")))


app.listen(3000, () => console.log('Example app listening on port 3000!'))
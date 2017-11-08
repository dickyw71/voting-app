const express = require('express')
const data = require('./data.json')
const app = express()

const getAuthorPollData = (polls, author) => polls.filter(poll => poll.author === author )

app.get('/', (req, res) => res.send(data))

console.log(JSON.stringify(getAuthorPollData(data.polls, "Will White")))

app.listen(3000, () => console.log('Example app listening on port 3000!'))
const express = require('express')
const data = require('./data.json')
const app = express()

app.get('/', (req, res) => res.send(data))


app.listen(3000, () => console.log('Example app listening on port 3000!'))
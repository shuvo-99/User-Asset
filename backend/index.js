const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const users = [
    {_id:1, name:'Karim', dob:'23-05-2012', img:'dsdsd'},
    {_id:2, name:'shihab', dob:'03-02-2012', img:'dsdsd'},
    {_id:3, name:'Yasin', dob:'13-09-2012', img:'dsdsd'}
]

app.get('/', (req,res) => {
    res.send('connection establish')
})

app.get('/users', (req,res) => {
    res.send(users)
})

app.post('/users', (req, res) => {
    console.log(req.body)
    console.log('post api hitting')
    const newuser = req.body
    users.push(newuser)
    res.send(users)

})

app.listen(port, () => {
    console.log(`conecction on:${port}`)
})
const Joi = require('joi')
const express = require('express')
const { json } = require('express')
const app = express()

app.use(json())

let movies = [
    {id: 1, name: "Dark night"},
    {id: 2, name: "Fight club"},
    {id: 3, name: "Shazam"},
]

app.get('/', (req, res) => {
    res.send('welcome to Vidly')
})

app.get('/movies', (req, res) => {
    res.send(movies)
})

app.get('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id))
    if (!movie)
        return res.status(400).send(`Movie with id: ${req.params.id} not found!`)
    res.send(`Movie with id ${movie.id} is: ${movie.name}`)
})

function validate_movie(movie) {
    const schema = {
        name: Joi.string().min(3).required()
    }
    return Joi.validate(movie, schema)
}

app.post('/movies', (req, res) => {
    const { error } = validate_movie(req.body)
    if (error)
        return res.status(404).send(error.details[0].message)
    const movie = {
        id: movies.length+1,
        name: req.body.name
    }
    movies.push(movie)
    res.send(movie)
})

app.put('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id))
    if (!movie)
        return res.status(400).send(`Movie with id: ${req.params.id} not found!`)
    const { error } = validate_movie(req.body)
    if (error)
        return res.status(404).send(error.details[0].message)
    movie.name = req.body.name
    res.send(movie)
})

app.delete('/movies/:id', (req, res) => {
    const movie = movies.find(m => m.id === parseInt(req.params.id))
    if (!movie)
        return res.status(400).send(`Movie with id: ${req.params.id} not found!`)
    const index = movies.indexOf(movie)
    movies.splice(index, 1)
    res.send(movie)
})

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listining on port ${port}...`)
})
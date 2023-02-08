const Joi = require('joi')
const express = require('express')
const app = express()

app.use(express.json())

let courses = [
	{id: 1, name: 'course 1'},
	{id: 2, name: 'course 2'},
	{id: 3, name: 'course 3'}
]
app.get('/', (req, res) => {
	res.send('Hello world!')
})

app.get('/api/courses', (req, res) => {
	res.send([1, 2, 3])
})

app.get('/api/courses/:id', (req, res) => {
	const course = courses.find(c => c.id === parseInt(req.params.id))
	if (!course)
		res.status(404).send('The course with the given id not found!')
	res.send(course)
})

function validate_course(course)
{
	const shcema = {
		name: Joi.string().min(3).required()
	}
	return Joi.validate(course, shcema)
}

app.post('/api/courses', (req, res) => {
	const { error } = validate_course(req.body)
	if (error)
		return res.status(400).send(result.error.detail[0].message)
	const course = {
		id: courses.length+1,
		name: req.body.name
	}
	courses.push(course)
	res.send(course)
})

app.put('/api/courses/:id', (req, res) => {
	const course = courses.find(c => c.id === parseInt(req.params.id))
	if (!course)
		return res.status(404).send('The course with the given id not found!')
	const { error } = validate_course(req.body)
	if (error)
		return res.status(400).send(result.error.detail[0].message)
	course.name = req.body.name
	res.send(course)
})

app.delete('/api/courses/:id', (req, res) => {
	const course = courses.find(c => c.id === parseInt(req.params.id))
	if (!course)
		return res.status(404).send('The course with the given id not found!')
	const index = courses.indexOf(course)
	courses.splice(index, 1)
	res.send(course)
})

const port = process.env.PORT || 3000

app.listen(port, () => console.log(`Listening on port ${port}..`))

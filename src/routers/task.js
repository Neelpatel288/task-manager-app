import express from 'express'
import { Task  } from '../models/task.js'
export const taskRouter = new express.Router()

taskRouter.post('/tasks', async (req, res) => {
    const task = new Task(req.body)
    try {
        await task.save()
        res.status(201).send(task)
    }catch (e) {
        res.status(400).send(e)
    }
})

taskRouter.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findById(_id)
        if (!task) {
            return res.status(404).send()
        }
        res.send(task)
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})


taskRouter.get('/tasks', async (req, res) => {
    try{
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})



taskRouter.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({error: 'Invalid Updates'})
    }

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {new: true, runValidators: true})
        if (!task) {
            return res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

taskRouter.delete('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
    if (!task) {
        return res.status(400).send()
    }
    res.send(task)
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})
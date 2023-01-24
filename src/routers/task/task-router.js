import express from 'express'
import { postTask, getTask, getTasks, patchTask, deleteTask } from './task-service.js'
import { checkValidIdLength, validateoperation } from '../../helper.js'
export const taskRouter = new express.Router()

taskRouter.post('/task', (req, res) => {
    try {
        const task = postTask(req.body)
        res.status(201).send(task)
    }catch (e) {
        res.status(400).send(e)
    }
})

taskRouter.get('/task/:id', async (req, res) => {
    const checkID = checkValidIdLength(req.params.id)
    if (!checkID) {
        return res.send({message: 'Id length must be 24'})
    }

    try {
        const task = await getTask(req.params.id)
        if (!task) {
            return res.status(404).send({message: 'Not found'})
        }
        res.send(task)
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

taskRouter.get('/tasks', async (req, res) => {
    try{
        const tasks = await getTasks()
        res.send(tasks)
    } catch (e) {
        console.log(e)
        res.status(500).send(e)
    }
})

taskRouter.patch('/task/:id', async (req, res) => {
    const checkID = checkValidIdLength(req.params.id)
    if (!checkID) {
        return res.send({message: 'Id length must be 24'})
    }

    const validOperation = validateoperation(req.body, ['description', 'completed'])
    if (!validOperation) {
        return res.status(400).send({message: 'Invalid Updates'})
    }

    try {
        const task = await patchTask(req.params.id, req.body, {new: true, runValidators: true})
        if (!task) {
            return res.status(404).send({message: 'Not found'})
        }

        res.send(task)
    } catch (e) {
        console.log(e)
        res.status(400).send(e)
    }
})

taskRouter.delete('/task/:id', async (req, res) => {
    const checkID = checkValidIdLength(req.params.id)
    if (!checkID) {
        return res.send({message: 'Id length must be 24'})
    }
    
    try {
        const task = await deleteTask(req.params.id)
    if (!task) {
        return res.status(400).send({message: 'Not found'})
    }
    res.send(task)
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})
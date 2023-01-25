import express from 'express'
import { postUser, getUsers, getUser, patchUser, deleteUser } from './user-service.js'
import { checkValidIdLength, validateoperation } from '../../helper.js'
export const userRouter = new express.Router()

userRouter.post('/', async (req, res) => {   
    try {
        const user = await postUser(req.body)
        res.status(201).send(user)
    } catch(e) {
        res.status(400).send(e)
    }
})

userRouter.get('/', async (req, res) => {

    try {
        const users = await getUsers()
        res.send(users)
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

userRouter.get('/:id', async (req, res) => {
    const checkID = checkValidIdLength(req.params.id)
    if (!checkID) {
        return res.send({message: 'Id length must be 24'})
    }
    try {
        const user = await getUser(req.params.id)
        if (!user) {
            return res.status(404).send({message: 'Not found'})
        }
        res.send(user)
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})

userRouter.patch('/:id', async (req, res) => {

    const checkID = checkValidIdLength(req.params.id)
    if (!checkID) {
        return res.send({message: 'Id length must be 24'})
    }

    const validOperation =  validateoperation(req.body, ['name', 'email', 'password', 'age'])
    if (!validOperation) {
        return res.status(400).send({error : 'Invalid updates'})
    }
    
    try {
        const user = await patchUser(req.params.id, req.body, { new: true, runValidators: true })
        if (!user) {
            res.status(404).send({message: 'Not found'})
        }
        res.send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

userRouter.delete('/:id', async (req,res) => {
    const checkID = checkValidIdLength(req.params.id)
    if (!checkID) {
        return res.send({message: 'Id length must be 24'})
    }

    try {
        const user = await deleteUser(req.params.id)
        if(!user) {
            return res.status(400).send({message: 'Not found'})
        }

        res.send(user)
    } catch (e) {
        console.log(e)
        res.status(500).send()
    }
})
import express from 'express'
import { postUser, getUsers, getUser, patchUser, deleteUser, userLogin } from './user-service.js'
import { checkValidIdLength, validateoperation } from '../../helper.js'
import { auth } from '../../middleware/auth.js'
import { User } from '../../models/user.js'
export const userRouter = new express.Router()

userRouter.post('/', async (req, res) => {   
    try {
        const user = await postUser(req.body)
        const token = await user.generateAuthToken()

        res.status(201).send({user, token})
    } catch(e) {
        res.status(400).send(e)
    }
})

userRouter.post('/login', async (req, res) => {

    try {
        const user = await userLogin(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (e) {
        res.status(400).send()
    }
})

userRouter.get('/me', auth, async (req, res) => {
    res.send(req.user)
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
        const user = await patchUser(req.params.id, req.body)
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
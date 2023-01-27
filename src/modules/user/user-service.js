import { User } from '../../models/user.js'

export const postUser = async (body) => {
    const user = await User.create(body)
    return user
}

export const userLogin = async (email, password) => {
    const user = await User.findByCredentials(email, password)
    // const token = await user.generateAuthToken()
    return user
}

export const getUsers = () => {
    const users = User.find({})
    return users
}

export const getUser = (id) => {
    const user = User.findById(id)
    return user
}

export const patchUser = async (id, body) => {

    const updates = Object.keys(body)
    let user = await User.findById(id)
    updates.forEach((update) => user[update] = body[update])
    
    user = await user.save()

    return user
}

export const deleteUser = (id) => {
    const user = User.findByIdAndDelete(id)
    return user
}
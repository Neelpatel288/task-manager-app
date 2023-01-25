import { User } from '../../models/user.js'

export const postUser = (body) => {
    const user = new User(body)
    user.save()
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

export const patchUser = (id, body, options) => {
    const user = User.findByIdAndUpdate(id, body, options)
    return user
}

export const deleteUser = (id) => {
    const user = User.findByIdAndDelete(id)
    return user
}
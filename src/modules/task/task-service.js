import { Task  } from '../../models/task.js'

export const postTask = (body) => {
    const task = new Task(body)
    task.save()
    return task
}

export const getTasks = () => {
    const tasks = Task.find({})
    return tasks
}

export const getTask = (id) => {
    const task = Task.findById(id)
    return task
}

export const patchTask = (id, body, option) => {
    const task = Task.findByIdAndUpdate(id, body, option)
    return task
}

export const deleteTask = (id) => {
    const task = Task.findByIdAndDelete(id)
    return task
}
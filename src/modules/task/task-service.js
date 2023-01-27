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

export const patchTask = async (id, body) => {
    const Updates = Object.keys(body)
    let task = await Task.findById(id)
    console.log("🚀 ~ file: task-service.js:22 ~ patchTask ~ task", task)

    Updates.forEach((update) => task[update] = body[update])

    task = await task.save()

    return task
}

export const deleteTask = (id) => {
    const task = Task.findByIdAndDelete(id)
    return task
}
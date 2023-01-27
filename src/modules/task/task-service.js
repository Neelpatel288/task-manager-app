import { Task } from "../../models/task.js";

export const postTask = (body, id) => {
  const task = new Task({
    ...body,
    owner: id,
  });
  task.save();
  return task;
};

export const getTasks = (owner) => {
  const tasks = Task.find({ owner });
  return tasks;
};

export const getTask = (_id, owner) => {
  const task = Task.findOne({ _id, owner });
  return task;
};

export const patchTask = async (id, body) => {
  const Updates = Object.keys(body);
  let task = await Task.findById(id);

  Updates.forEach((update) => (task[update] = body[update]));

  task = await task.save();

  return task;
};

export const deleteTask = (id) => {
  const task = Task.findByIdAndDelete(id);
  return task;
};

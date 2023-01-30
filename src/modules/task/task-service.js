import { Task } from "../../models/task.js";

export const postTask = async (body, id) => {
  const task = await Task.create({
    ...body,
    owner: id,
  });
  return task;
};

export const getTask = (_id, owner) => {
  const task = Task.findOne({ _id, owner });
  return task;
};

export const patchTask = async (_id, owner, body) => {
  const Updates = Object.keys(body);
  let task = await Task.findOne({ _id, owner });

  Updates.forEach((update) => (task[update] = body[update]));

  task = await task.save();

  return task;
};

export const deleteTask = (_id, owner) => {
  const task = Task.findOneAndDelete({ _id, owner });
  return task;
};

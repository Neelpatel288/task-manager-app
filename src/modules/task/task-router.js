import express from "express";
import {
  postTask,
  getTask,
  getTasks,
  patchTask,
  deleteTask,
} from "./task-service.js";
import { validateoperation } from "../../helper.js";
import { auth } from "../../middleware/auth.js";
import { errorMessages } from "../../errorMessages.js";
export const taskRouter = new express.Router();

taskRouter.post("/", auth, (req, res) => {
  try {
    const task = postTask(req.body, req.user._id);
    res.status(201).send(task);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

taskRouter.get("/all", auth, async (req, res) => {
  try {
    const tasks = await getTasks(req.user._id);
    res.send(tasks);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

taskRouter.get("/:id", auth, async (req, res) => {
  const ownerId = req.user._id;
  const taskId = req.params.id;
  if (taskId.lenght !== 24) {
    throw new Error({ message: errorMessages.ProvideValidId });
  }

  try {
    const task = await getTask(taskId, ownerId);
    if (!task) {
      throw new Error({ message: errorMessages.notFound });
    }
    res.send(task);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

taskRouter.patch("/:id", async (req, res) => {
  const taskId = req.params.id;
  if (taskId.lenght !== 24) {
    throw new Error({ message: errorMessages.ProvideValidId });
  }

  if (!validateoperation(req.body, ["description", "completed"])) {
    throw new Error(errorMessages.inValidUpdates);
  }

  try {
    const task = await patchTask(req.params.id, req.body);
    if (!task) {
      throw new Error({ message: errorMessages.notFound });
    }

    res.send(task);
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

taskRouter.delete("/:id", async (req, res) => {
  const taskId = req.params.id;
  if (taskId.lenght !== 24) {
    throw new Error({ message: errorMessages.ProvideValidId });
  }

  try {
    const task = await deleteTask(taskId);
    if (!task) {
      throw new Error({ message: errorMessages.notFound });
    }
    res.send(task);
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

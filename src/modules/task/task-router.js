import express from "express";
import {
  postTask,
  getTask,
  getTasks,
  patchTask,
  deleteTask,
} from "./task-service.js";
import { checkValidIdLength, validateoperation } from "../../helper.js";
import { auth } from "../../middleware/auth.js";
import { errorMessages } from "../../errorMessages.js";
export const taskRouter = new express.Router();

taskRouter.post("/", auth, (req, res) => {
  try {
    const task = postTask(req.body, req.user._id);
    res.status(201).send({ data: task });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

taskRouter.get("/all", auth, async (req, res) => {
  try {
    const tasks = await getTasks(req.user._id);
    res.send({ data: tasks });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
});

taskRouter.get("/:id", auth, async (req, res) => {
  const ownerId = req.user._id;
  const taskId = req.params.id;
  try {
    if (!checkValidIdLength === 24) {
      throw new Error(errorMessages.provideValidId);
    }

    const task = await getTask(taskId, ownerId);
    if (!task) {
      throw new Error(errorMessages.notFound);
    }
    res.send({ data: task });
  } catch (e) {
    console.log(e.message);
    const { message } = e;
    res.status(400).send({ message, status: 400 });
  }
});

taskRouter.patch("/:id", auth, async (req, res) => {
  const taskId = req.params.id;
  const ownerId = req.user._id;
  try {
    if (!checkValidIdLength === 24) {
      throw new Error(errorMessages.provideValidId);
    }

    if (!validateoperation(req.body, ["description", "completed"])) {
      throw new Error(errorMessages.inValidUpdates);
    }

    const task = await patchTask(taskId, ownerId, req.body);
    if (!task) {
      throw new Error(errorMessages.notFound);
    }

    res.send({ data: task });
  } catch (e) {
    console.log(e.message);
    const { message } = e;
    res.status(400).send({ message, status: 400 });
  }
});

taskRouter.delete("/:id", auth, async (req, res) => {
  const taskId = req.params.id;
  const ownerId = req.user._id;

  try {
    if (!checkValidIdLength === 24) {
      throw new Error(errorMessages.provideValidId);
    }

    const task = await deleteTask(taskId, ownerId);
    if (!task) {
      throw new Error(errorMessages.notFound);
    }
    res.send({ data: task });
  } catch (e) {
    console.log(e.message);
    const { message } = e;
    res.status(500).send({ message, status: 500 });
  }
});

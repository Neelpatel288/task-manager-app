import express from "express";
import { postUser, patchUser, userLogin } from "./user-service.js";
import { validateoperation } from "../../helper.js";
import { auth } from "../../middleware/auth.js";
import { errorMessages } from "../../errorMessages.js";
export const userRouter = new express.Router();

userRouter.post("/", async (req, res) => {
  try {
    const user = await postUser(req.body);
    const token = await user.generateAuthToken();

    res.status(201).send({ data: { user, token } });
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const user = await userLogin(req.body.email, req.body.password);
    const token = await user.generateAuthToken();
    res.send({ data: { user, token } });
  } catch (e) {
    console.log(e);
    res.status(400).send();
  }
});

userRouter.post("/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });
    await req.user.save();
    res.send();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

userRouter.post("/logoutAll", auth, async (req, res) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

userRouter.get("/me", auth, async (req, res) => {
  res.send({ data: req.user });
});

userRouter.patch("/me", auth, async (req, res) => {
  try {
    if (!validateoperation(req.body, ["name", "email", "password", "age"])) {
      throw new Error(errorMessages.inValidUpdates);
    }

    const user = await patchUser(req.user, req.body);
    res.send({ data: user });
  } catch (e) {
    console.log(e.message);
    const { message } = e;
    res.status(400).send({ message, status: 400 });
  }
});

userRouter.delete("/me", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.send({ data: req.user });
  } catch (e) {
    console.log(e);
    res.status(500).send();
  }
});

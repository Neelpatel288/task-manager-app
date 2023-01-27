import express from "express";
import("./db/mongoose.js");
import { userRouter } from "./modules/user/user-router.js";
import { taskRouter } from "./modules/task/task-router.js";
import { Task } from "./models/task.js";
import { User } from "./models/user.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/user", userRouter);
app.use("/task", taskRouter);

app.listen(port, () => {
  console.log("Server is up on port " + port);
});

// const main = async () => {
//   // const task = await Task.findById("63d3b2303f15e5f4407bc24b");
//   // await task.populate("owner");
//   // console.log("🚀 ~ file: index.js:22 ~ main ~ task", task.owner);

//   const user = await User.findById("63d3b1e8ecfab3e4158e7e96");
//   await user.populate("tasks");
//   console.log(user.tasks);
// };

// main();

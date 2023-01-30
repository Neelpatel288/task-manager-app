import jwt from "jsonwebtoken";
import { errorMessages } from "../errorMessages.js";
import { User } from "../models/user.js";

export const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, "thisismynewcourse");
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error(errorMessages.pleaseAuth);
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    console.log(e.message);
    const { message } = e;
    res.status(401).send({ message, status: 401 });
  }
};

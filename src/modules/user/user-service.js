import { User } from "../../models/user.js";

export const postUser = async (body) => {
  const user = await User.create(body);
  return user;
};

export const userLogin = async (email, password) => {
  const user = await User.findByCredentials(email, password);
  return user;
};

export const patchUser = async (user, body) => {
  const updates = Object.keys(body);
  updates.forEach((update) => (user[update] = body[update]));

  return await user.save();
};

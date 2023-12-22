import { createUser, getUserByEmail } from "../db/users";
import express from "express";
import { authentication, random } from "../helpers";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      const response = {
        message: "All inputs Required!!!",
        status: 400
      }
      return res.status(400).json(response);
    }
    const userExists = await getUserByEmail(email);
    if (userExists) {
      const response = {
        message: "User Already Exist!!!",
        status: 400
      }
      return res.status(400).json(response);
    }

    const salt = random();
    const user = await createUser({
      email,
      username,
      authentication: {
        salt,
        password: authentication(salt, password),
      },
    });
    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

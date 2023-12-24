import { createUser, getUserByEmail } from "../db/users";
import express from "express";
import { authentication, random } from "../helpers";

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const response = {
        status: 400,
        message: "All inputs Required!!!",
      };
      return res.status(400).json(response);
    }

    const user = await getUserByEmail(email).select(
      "+authentication.salt +authentication.password"
    );

    if (!user) {
      const response = {
        status: 400,
        message: "User Doesn't Exist!!",
      };
      return res.status(400).json(response);
    }

    const expectedHash = authentication(user.authentication.salt, password);

    if (user.authentication.password !== expectedHash) {
      const response = {
        status: 403,
        message: "Forbidden",
      };
      return res.status(403).json(response);
    }

    const salt = random();
    user.authentication.sessionToken = authentication(
      salt,
      user._id.toString()
    );
    await user.save();
    res.cookie('MANGALA-REST-API-GUIDE', user.authentication.sessionToken, {domain:'localhost', path:'/'})
    const response = {
      status: 200,
      user: user,
      message: "User Login Successful!!!",
    };
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;
    if (!email || !password || !username) {
      const response = {
        message: "All inputs Required!!!",
        status: 400,
      };
      return res.status(400).json(response);
    }
    const userExists = await getUserByEmail(email);
    if (userExists) {
      const response = {
        message: "User Already Exist!!!",
        status: 400,
      };
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

import { getUserByEmail } from "db/users";
import express from "express";

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const {email, password, username} = req.body;
    if(!email || !password || !username){
      return res.sendStatus(400);
    }
    const userExists = await getUserByEmail(email)
    if(userExists){
      return res.sendStatus(400);
    }
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

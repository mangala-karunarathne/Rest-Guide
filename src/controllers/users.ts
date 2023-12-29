import express from "express";

import { getUsers } from "../db/users";

export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const users = await getUsers();
<<<<<<< HEAD
=======
    console.log("users", users);
>>>>>>> 4a88752646f9677dd900e49c1dedc7696d5cbef4
    return res.status(200).json(users)
  } catch (error) {
    console.log(error);
    return res.status(400);
  }
};

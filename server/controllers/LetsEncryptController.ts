import * as express from "express";
const LETS_ENCRYPT_KEY = process.env.LETS_ENCRYPT_KEY;

const getKey = (req: express.Request, res: express.Response) => {
  return res.send(LETS_ENCRYPT_KEY);
};

export default {
  get: getKey,
};

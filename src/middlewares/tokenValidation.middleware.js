import { sessionsCollection } from "../database/db.js";

export const validateToken = async (req, res, next) => {
  const body = req.body;

  const { authorization } = req.headers;
  const token = authorization?.replace("Bearer ", "");

  if (!token) return res.sendStatus(401);

  try {
    const session = await sessionsCollection.findOne({ token: token });
    if (!session) return res.sendStatus(401);
    req.session = session;
  } catch (error) {
    res.sendStatus(500);
  }

  req.token = token;

  next();
};

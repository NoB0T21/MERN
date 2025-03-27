import express from "express";
import { createUser, loginUser } from "../controller/user.controller.js";
const routes = express.Router();

routes.post('/signup', createUser);
routes.post('/signin', loginUser);

export default routes;
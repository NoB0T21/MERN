import express from "express";
import { createUser, loginUser,setCookies, random, getCookies } from "../controller/user.controller.js";
const routes = express.Router();
import { auth } from "../middleware/auth.js";

routes.get('/',random);
routes.post('/signup', createUser);
routes.post('/signin', loginUser);
routes.post('/cookies', setCookies);
routes.get('/token', auth, getCookies);


export default routes;
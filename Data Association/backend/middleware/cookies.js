import {jwtVerify, SignJWT} from 'jose';
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.JET_SECRET;
const secret = new TextEncoder().encode(secretKey);

export const generateToken = async (email , name) => {
        const token = await new SignJWT({email,name})
        .setProtectedHeader({ alg: "HS256" })
        .setExpirationTime("7d")
        .sign(secret);
    return token
}

export const verifyToken = async (token) => {
    const decoded = await jwtVerify(token, secret);
    return decoded
}
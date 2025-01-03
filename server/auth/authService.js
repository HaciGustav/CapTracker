import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../db";
import AuthenticationError from "../utils/AuthenticationError";
import {
  loginFailLog,
  loginSuccessLog,
  registerSuccessLog,
} from "../utils/logger/logger";

const JWT_SECRET = process.env.JWT_SECRET || "captracker";
const JWT_EXPIRATION = "1h"; // Set your desired expiration time for JWT token

const userExistsByMail = async (email) => {
  return await prisma.user.findUnique({ where: { email } });
};
const userExistsByUsername = async (username) => {
  return await prisma.user.findUnique({ where: { username } });
};

export const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });
};

export const getUserFromToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const register = async (credentials) => {
  const { username, email, password } = credentials;

  const userByEmail = await userExistsByMail(email);
  const userByUsername = await userExistsByUsername(username);

  if (userByEmail) {
    registerFailLog(credentials);
    const message = `User already exists with given email: ${email} `;
    throw new AuthenticationError(400, message);
  }

  if (userByUsername) {
    registerFailLog(credentials);
    const message = `User already exists with given username: ${username}`;
    throw new AuthenticationError(400, message);
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        ...credentials,
        password: hashedPassword,
      },
    });

    const token = generateToken(user);
    registerSuccessLog();
    return { user, token };
  } catch (error) {
    console.log(error);
    throw new AuthenticationError(500, "F*ck You");
  }
};

export const login = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    loginFailLog(email, "User not found");
    throw new AuthenticationError(404, "User not found");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    loginFailLog(email, "Invalid password");
    throw new AuthenticationError(400, "Invalid password");
  }
  const token = generateToken(user);
  loginSuccessLog(user);
  return { user, token };
};

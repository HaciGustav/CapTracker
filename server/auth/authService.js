import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../db";
import AuthenticationError from "../utils/error/AuthenticationError";

import jwtOptions from "@/config/jwt_options.json";
import { sendEmail } from "../utils/email-service/email";

const JWT_SECRET = process.env.JWT_SECRET || "captracker";

const userExistsByMail = async (email) => {
  return await prisma.user.findUnique({ where: { email } });
};
const userExistsByUsername = async (username) => {
  return await prisma.user.findUnique({ where: { username } });
};

export const generateToken = (user) => {
  const userPayload = { id: user.id, email: user.email, role: user.user_role };
  return jwt.sign({ user: userPayload }, JWT_SECRET, {
    expiresIn: jwtOptions.expiresIn,
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
    const message = `User already exists with given email: ${email} `;
    throw new AuthenticationError(400, message);
  }

  if (userByUsername) {
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
    return { user, token };
  } catch (error) {
    throw new AuthenticationError(500, "F*ck You");
  }
};

export const login = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AuthenticationError(404, "User not found");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new AuthenticationError(400, "Invalid password");
  }
  const token = generateToken(user);
  return { user, token };
};

export const sendPasswordRecoveryEmail = async (email) => {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      throw new AuthenticationError(404, "User not found");
    }

    const resetToken = await bcrypt.hash(new Date().getTime().toString(), 10);
    console.log(resetToken);

    const resetTokenExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour expiration

    await prisma.user.update({
      where: { email },
      data: { resetToken, resetTokenExpires },
    });

    const resetUrl = `${process.env.NEXTAUTH_URL}/auth/reset-password?token=${resetToken}`;

    await sendEmail(
      email,
      "Password Reset",
      resetUrl
      // `Click here to reset your password: ${resetUrl}`
    );
  } catch (error) {
    if (error instanceof AuthenticationError) {
      throw error;
    }
    console.log(error);
    throw new AuthenticationError(500, "Something went wrong on the server!");
  }
};

export const resetPassword = async (token, password) => {
  const user = await prisma.user.findFirst({
    where: { resetToken: token },
  });

  if (!user) {
    throw new AuthenticationError(401, "Invalid or expired token");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const updatedUser = await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpires: null,
    },
  });

  return updatedUser;
};

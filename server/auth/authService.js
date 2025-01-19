import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../db";
import AuthenticationError from "../utils/error/AuthenticationError";
import jwtOptions from "@/config/jwt_options.json";
import { sendEmail } from "../utils/email-service/email";
import { throwErrorOnMissingField } from "../utils/validators";

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

const activateUser = async (userInfo) => {
  return await prisma.user.update({
    where: { id: userInfo.id },
    data: {
      ...userInfo,
      is_active: true,
    },
  });
};

export const register = async (credentials) => {
  const { username, email, password } = credentials;

  const validatingFields = ["password", "email"];
  throwErrorOnMissingField(validatingFields, credentials);

  const userByEmail = await userExistsByMail(email);
  const userByUsername = await userExistsByUsername(username);

  const hashedPassword = await bcrypt.hash(password, 10);
  if (userByEmail) {
    if (userByEmail.is_active) {
      throw new AuthenticationError(
        400,
        `User already exists with given email: ${email} `
      );
    } else {
      const activatedUser = await activateUser({
        ...userByEmail,
        password: hashedPassword,
      });
      const token = generateToken(activatedUser);
      return { user: activatedUser, token };
    }
  }

  if (userByUsername) {
    if (userByUsername.is_active) {
      throw new AuthenticationError(
        400,
        `User already exists with given username: ${username}`
      );
    } else {
      const activatedUser = await activateUser({
        ...userByUsername,
        password: hashedPassword,
      });
      const token = generateToken(activatedUser);
      return { user: activatedUser, token };
    }
  }
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
    throw new AuthenticationError(500, "Something went wrong on the server!");
  }
};

export const login = async (email, password) => {
  const user = await prisma.user.findUnique({
    where: { email, is_active: true },
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
    const user = await prisma.user.findUnique({
      where: { email, is_active: true },
    });
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

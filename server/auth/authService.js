import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import prisma from "../db";
import AuthenticationError from "../Utils/AuthenticationError";
import cookie from "cookie";

const JWT_SECRET = process.env.JWT_SECRET || "captracker";
const JWT_EXPIRATION = "1h"; // Set your desired expiration time for JWT token

export const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
    expiresIn: JWT_EXPIRATION,
  });
};

export const setTokenCookie = (res, token) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 24, // 1 hour
      path: "/",
    })
  );
};

export const getUserFromToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

export const register = async (credentials) => {
  const { username, email, password, first_name, last_name } = credentials;
  console.log(credentials);
  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: {
        ...credentials,
        password: hashedPassword,
      },
    });
    console.log("USER=>", user);
    return user;
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
    throw new AuthenticationError(404, "User not found");
  }

  const isValidPassword = await bcrypt.compare(password, user.password);

  if (!isValidPassword) {
    throw new AuthenticationError(400, "Invalid password");
  }

  return user;
};

export const logout = (res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: -1, // Set cookie expiry to past to delete it
      path: "/",
    })
  );
};

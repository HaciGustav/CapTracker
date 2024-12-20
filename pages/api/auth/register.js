import {
  generateToken,
  register,
  setTokenCookie,
} from "@/server/auth/authService";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const credentials = req.body;
      const user = await register(credentials);

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(error.status).json(error.message);
    }
  } else {
    res.status(405);
  }
}

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
      const accessToken = generateToken(user);
      setTokenCookie(res, accessToken);
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  } else {
    res.status(404);
  }
}

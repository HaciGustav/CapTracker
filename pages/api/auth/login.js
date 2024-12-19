import {
  generateToken,
  login,
  setTokenCookie,
} from "@/server/auth/authService";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      const user = await login(email, password);
      const accessToken = generateToken(user);
      setTokenCookie(res, accessToken);
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
    }
  } else {
    res.status(404);
  }
}

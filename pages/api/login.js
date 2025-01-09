import { login } from "@/server/auth/authService";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { email, password } = req.body;
      const user = await login(email, password);
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(error.status).json(error.message);
    }
  } else {
    res.status(405);
  }
};

export default handler;

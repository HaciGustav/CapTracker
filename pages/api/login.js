import { login } from "@/server/auth/authService";
import logger from "@/server/utils/logger/logger";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = req.body;
    try {
      const credentials = await login(email, password);

      logger.meta({ type: "LOGIN", email }).log("User logged in!");
      res.status(200).json(credentials);
    } catch (error) {
      console.log(error);
      logger.meta({ type: "LOGIN", email }).error(error.status, error.message);
      res.status(error.status).json(error.message);
    }
  } else {
    res.status(405);
  }
};

export default handler;

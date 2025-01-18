import { register } from "@/server/auth/authService";
import logger from "@/server/utils/logger/logger";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const credentials = req.body;
      const user = await register(credentials);
      logger
        .meta({ type: "REGISTER", email: credentials.email })
        .log("User registered!");
      res.status(200).json(user);
    } catch (error) {
      logger
        .meta({ type: "REGISTER", email })
        .error(error.status, error.message);

      res.status(error.status).json(error.message);
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
export default handler;

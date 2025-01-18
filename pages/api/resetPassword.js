import { resetPassword } from "@/server/auth/authService";
import logger from "@/server/utils/logger/logger";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { token, password } = req.body;
    try {
      const credentials = await resetPassword(token, password);

      logger
        .meta({ type: "PASSWORD", email: credentials.email })
        .log("User reset password!");
      res.status(200).json(credentials);
    } catch (error) {
      console.log(error);
      logger.meta({ type: "PASSWORD" }).error(error.status, error.message);
      res.status(error.status).json(error.message);
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;

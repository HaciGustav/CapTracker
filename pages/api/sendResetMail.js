import { sendPasswordRecoveryEmail } from "@/server/auth/authService";
import logger from "@/server/utils/logger/logger";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { email } = req.body;
    try {
      const credentials = await sendPasswordRecoveryEmail(email);

      logger
        .meta({ type: "PASSWORD", email })
        .log("Password recovery mail has been sent!");
      res.status(200).json({
        message: "Password recovery mail has been sent!",
      });
    } catch (error) {
      console.log(error);
      logger
        .meta({ type: "PASSWORD", email })
        .error(error.status, error.message);
      res.status(error.status).json(error.message);
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default handler;

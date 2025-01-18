import { createTransaction } from "@/server/stock/transactionService";
import logger from "@/server/utils/logger/logger";
import { withAuth } from "@/server/utils/middleware/authMiddleware";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const userID = req.headers["captracker_userid"];

    try {
      const transactionInfo = req.body;
      const transaction = await createTransaction(transactionInfo);

      logger
        .meta({ type: "CREATE", userID, item: transaction })
        .log("A new Transaction created!");

      res.status(200).json({ transaction, message: `Transaction performed!` });
    } catch (error) {
      logger
        .meta({ type: "CREATE", userID, payload: req.body })
        .error(error.status, error.message);

      console.log("API", error);
      res.status(error.status).json(error.message);
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
export default withAuth(handler);

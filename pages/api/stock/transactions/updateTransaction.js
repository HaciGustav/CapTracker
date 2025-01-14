import { updateTransaction } from "@/server/stock/transactionService";
import logger from "@/server/utils/logger/logger";
import { withAuth } from "@/server/utils/middleware/authMiddleware";

const handler = async (req, res) => {
  if (req.method === "PUT") {
    const userID = req.headers["captracker_userid"];
    try {
      const transactionInfo = req.body;
      if (!transactionInfo.id) {
        res.status(400).json("Transaction ID is required!");
      }

      const transaction = await updateTransaction(transactionInfo);
      logger
        .meta({ type: "UPDATE", userID, item: transaction })
        .log("Transaction has been updated!");
      res.status(200).json({
        transaction,
        message: "Transaction has been updated successfully!",
      });
    } catch (error) {
      logger
        .meta({ type: "UPDATE", userID, payload: req.body })
        .error(error.status, error.message);

      console.log(error);
      res.status(error.status).json(error.message);
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
export default withAuth(handler);

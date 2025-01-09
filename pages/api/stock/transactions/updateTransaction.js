import { updateTransaction } from "@/server/stock/transactionService";
import { withAuth } from "@/server/utils/middleware/authMiddleware";

const handler = async (req, res) => {
  if (req.method === "PUT") {
    try {
      const transactionInfo = req.body;
      if (!transactionInfo.id) {
        res.status(400).json("Transaction ID is required!");
      }

      const transaction = await updateTransaction(transactionInfo);

      //TODO: Log operation

      res.status(200).json({
        transaction,
        message: "Transaction has been updated successfully!",
      });
    } catch (error) {
      //TODO: Log Error
      console.log(error);
      res.status(error.status).json(error.message);
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
export default withAuth(handler);

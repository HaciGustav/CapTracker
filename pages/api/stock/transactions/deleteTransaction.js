import { deleteTransaction } from "@/server/stock/transactionService";
import { withAuth } from "@/server/utils/middleware/authMiddleware";

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    try {
      const transactionId = req.query?.id;
      const transaction = await deleteTransaction(parseInt(transactionId));

      res.status(200).json({
        transaction,
        message: "Transaction has been deleted successfully!",
      });
    } catch (error) {
      console.log(error);
      res.status(error.status).json(error.message);
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
export default withAuth(handler);

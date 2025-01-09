import { createTransaction } from "@/server/stock/transactionService";
import { withAuth } from "@/server/utils/middleware/authMiddleware";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const transactionInfo = req.body;
      const transaction = await createTransaction(transactionInfo);

      res.status(200).json({ transaction, message: `Transaction performed!` });
    } catch (error) {
      console.log(error);
      res.status(error.status).json(error.message);
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
export default withAuth(handler);

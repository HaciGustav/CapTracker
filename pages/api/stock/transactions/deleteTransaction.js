import { deleteTransaction } from "@/server/stock/transactionService";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      const transactionInfo = req.body;
      const transaction = await deleteTransaction(transactionInfo);

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
}

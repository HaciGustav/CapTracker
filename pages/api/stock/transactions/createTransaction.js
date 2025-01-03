import { createTransaction } from "@/server/stock/transactionService";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const transactionInfo = req.body;
      const transaction = await createTransaction(transactionInfo);

      res.status(200).json(transaction);
    } catch (error) {
      console.log(error);
      res.status(error.status).json(error.message);
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

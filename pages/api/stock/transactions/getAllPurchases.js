import { getAllPurchases } from "@/server/stock/transactionService";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const purchases = await getAllPurchases();
      res.status(200).json(purchases);
    } catch (error) {
      console.log(error);
      res.status(error.status).json(error.message);
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

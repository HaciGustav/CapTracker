import { getAllSales } from "@/server/stock/transactionService";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const sales = await getAllSales();
      res.status(200).json(sales);
    } catch (error) {
      console.log(error);
      res.status(error.status).json(error.message);
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

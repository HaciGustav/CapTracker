import {
  getTotalPurchases,
  getTotalSales,
} from "@/server/stock/transactionService";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const totalPurchases = await getTotalPurchases();
      const totalSales = await getTotalSales();
      const profit = totalSales - totalPurchases;

      res
        .status(200)
        .json({ purchases: totalPurchases, sales: totalSales, profit });
    } catch (error) {
      console.log(error);
      res.status(error.status).json(error.message);
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

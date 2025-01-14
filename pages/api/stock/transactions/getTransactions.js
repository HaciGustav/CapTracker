import {
  getAllPurchases,
  getAllSales,
  getTotalPurchases,
  getTotalSales,
} from "@/server/stock/transactionService";
import logger from "@/server/utils/logger/logger";
import { withAuth } from "@/server/utils/middleware/authMiddleware";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const purchases = await getAllPurchases();
      const sales = await getAllSales();
      const totalPurchases = await getTotalPurchases();
      const totalSales = await getTotalSales();
      const profit = totalSales - totalPurchases;
      // console.log({ userID: req.headers["captracker_userid"] });
      res.status(200).json({
        purchases,
        sales,
        summary: { purchases: totalPurchases, sales: totalSales, profit },
      });
    } catch (error) {
      console.log(error);
      res.status(error.status || 500).json(error.message);
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default withAuth(handler);

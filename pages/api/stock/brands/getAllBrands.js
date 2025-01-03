import { getAllBrands } from "@/server/stock/brandService";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const brands = await getAllBrands();
      res.status(200).json(brands);
    } catch (error) {
      console.log(error);
      res.status(error.status).json(error.message);
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

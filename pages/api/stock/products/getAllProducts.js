import { getAllProducts } from "@/server/stock/productService";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const products = await getAllProducts();
      res.status(200).json(products);
    } catch (error) {
      console.log(error);
      res.status(error.status).json(error.message);
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

import { createProduct } from "@/server/stock/productService";
import { withAuth } from "@/server/utils/middleware/authMiddleware";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const productInfo = req.body;
      const product = await createProduct(productInfo);

      res.status(200).json({
        product,
        message: `Product: ${product.name} created successfully!`,
      });
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

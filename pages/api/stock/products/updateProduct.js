import { updateProduct } from "@/server/stock/productService";
import { withAuth } from "@/server/utils/middleware/authMiddleware";

const handler = async (req, res) => {
  if (req.method === "PUT") {
    try {
      const productInfo = req.body;
      if (!productInfo.id) {
        res.status(400).json("Product ID is required!");
      }

      const product = await updateProduct(productInfo);

      //TODO: Log operation

      res.status(200).json({
        product,
        message: "Product has been updated successfully!",
      });
    } catch (error) {
      //TODO: Log Error
      console.log(error);
      res.status(error.status).json(error.message);
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
export default withAuth(handler);

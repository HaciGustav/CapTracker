import { deleteProduct } from "@/server/stock/productService";
import { withAuth } from "@/server/utils/middleware/authMiddleware";

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    try {
      const productId = req.query?.id;
      if (!productId) {
        res.status(400).json("Product ID is required!");
      }

      await deleteProduct(productId);

      //TODO: Log operation

      res.status(200).json({
        message: "Product has been deleted successfully!",
      });
    } catch (error) {
      //TODO: Log Error
      // console.log(error);
      res.status(error.status).json(error.message);
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
export default withAuth(handler);

import { updateProduct } from "@/server/stock/productService";
import logger from "@/server/utils/logger/logger";
import { withAuth } from "@/server/utils/middleware/authMiddleware";

const handler = async (req, res) => {
  if (req.method === "PUT") {
    const userID = req.headers["captracker_userid"];
    try {
      const productInfo = req.body;
      if (!productInfo.id) {
        res.status(400).json("Product ID is required!");
      }

      const product = await updateProduct(productInfo);

      logger
        .meta({ type: "UPDATE", userID, item: product })
        .log("Product has been updated!");

      res.status(200).json({
        product,
        message: "Product has been updated successfully!",
      });
    } catch (error) {
      logger
        .meta({ type: "UPDATE", userID, payload: req.body })
        .error(error.status, error.message);

      console.log(error);

      res.status(error.status).json(error.message);
    }
  } else {
    res.setHeader("Allow", ["PUT"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
export default withAuth(handler);

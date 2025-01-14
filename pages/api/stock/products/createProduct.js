import { createProduct } from "@/server/stock/productService";
import logger from "@/server/utils/logger/logger";
import { withAuth } from "@/server/utils/middleware/authMiddleware";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const userID = req.headers["captracker_userid"];

    try {
      const productInfo = req.body;
      const product = await createProduct(productInfo);

      logger
        .meta({ type: "CREATE", userID, item: product })
        .log("A new product created!");

      res.status(200).json({
        product,
        message: `Product: ${product.name} created successfully!`,
      });
    } catch (error) {
      logger
        .meta({ type: "CREATE", userID, payload: req.body })
        .error(error.status, error.message);

      console.log(error);
      res.status(error.status).json(error.message);
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default withAuth(handler);

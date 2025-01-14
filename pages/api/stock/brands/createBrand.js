import { createBrand } from "@/server/stock/brandService";
import logger from "@/server/utils/logger/logger";
import { withAuth } from "@/server/utils/middleware/authMiddleware";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const userID = req.headers["captracker_userid"];

    try {
      const brandInfo = req.body;
      const brand = await createBrand(brandInfo);

      logger
        .meta({ type: "CREATE", userID, item: brand })
        .log("A new brand created!");

      res
        .status(200)
        .json({ brand, message: `Brand: ${brand.name} created successfully!` });
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

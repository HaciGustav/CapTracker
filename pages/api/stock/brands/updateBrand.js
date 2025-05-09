import { updateBrand } from "@/server/stock/brandService";
import logger from "@/server/utils/logger/logger";
import { withAuth } from "@/server/utils/middleware/authMiddleware";

const handler = async (req, res) => {
  if (req.method === "PUT") {
    const userID = req.headers["captracker_userid"];
    try {
      const brandInfo = req.body;
      if (!brandInfo.id) {
        res.status(400).json("Brand ID is required!");
      }

      const brand = await updateBrand(brandInfo);

      logger
        .meta({ type: "UPDATE", userID, item: brand })
        .log("Brand has been updated!");

      res.status(200).json({
        brand,
        message: "Brand has been updated successfully!",
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

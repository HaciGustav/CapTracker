import { updateCategory } from "@/server/stock/categoryService";
import logger from "@/server/utils/logger/logger";
import { withAuth } from "@/server/utils/middleware/authMiddleware";

const handler = async (req, res) => {
  if (req.method === "PUT") {
    try {
      const categoryInfo = req.body;
      if (!categoryInfo.id) {
        res.status(400).json("Category ID is required!");
      }

      const category = await updateCategory(categoryInfo);

      logger
        .meta({ type: "UPDATE", userID, item: category })
        .log("Category has been updated!");

      res.status(200).json({
        category,
        message: "Category has been updated successfully!",
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

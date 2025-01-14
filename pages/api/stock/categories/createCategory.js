import { createCategory } from "@/server/stock/categoryService";
import logger from "@/server/utils/logger/logger";
import { withAuth } from "@/server/utils/middleware/authMiddleware";

const handler = async (req, res) => {
  if (req.method === "POST") {
    const userID = req.headers["captracker_userid"];

    try {
      const categoryInfo = req.body;
      const category = await createCategory(categoryInfo);

      logger
        .meta({ type: "CREATE", userID, item: category })
        .log("A new category created!");

      res.status(200).json({
        category,
        message: `Category: ${category.name} created successfully!`,
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

import { createCategory } from "@/server/stock/categoryService";
import { withAuth } from "@/server/utils/middleware/authMiddleware";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const categoryInfo = req.body;
      const category = await createCategory(categoryInfo);

      res
        .status(200)
        .json({
          category,
          message: `Category: ${category.name} created successfully!`,
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

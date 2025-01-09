import { updateCategory } from "@/server/stock/categoryService";
import { withAuth } from "@/server/utils/middleware/authMiddleware";

const handler = async (req, res) => {
  if (req.method === "PUT") {
    try {
      const categoryInfo = req.body;
      if (!categoryInfo.id) {
        res.status(400).json("Category ID is required!");
      }

      const category = await updateCategory(categoryInfo);

      //TODO: Log operation

      res.status(200).json({
        category,
        message: "Category has been updated successfully!",
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

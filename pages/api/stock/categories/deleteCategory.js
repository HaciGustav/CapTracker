import { deleteCategory } from "@/server/stock/categoryService";
import { withAuth } from "@/server/utils/middleware/authMiddleware";

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    try {
      const categoryId = req.query?.id;
      if (!categoryId) {
        res.status(400).json("Category ID is required!");
      }

      await deleteCategory(parseInt(categoryId));

      //TODO: Log operation

      res.status(200).json({
        message: "Category has been deleted successfully!",
      });
    } catch (error) {
      //TODO: Log Error
      console.log(error);
      res.status(error.status).json(error.message);
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
export default withAuth(handler);

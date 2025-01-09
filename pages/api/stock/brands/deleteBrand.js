import { deleteBrand } from "@/server/stock/brandService";
import { withAuth } from "@/server/utils/middleware/authMiddleware";

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    try {
      const brandId = req.query?.id;
      if (!brandId) {
        res.status(400).json("Brand ID is required!");
      }

      await deleteBrand(parseInt(brandId));

      //TODO: Log operation

      res.status(200).json({
        message: "Brand has been deleted successfully!",
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

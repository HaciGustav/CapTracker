import { updateBrand } from "@/server/stock/brandService";
import { withAuth } from "@/server/utils/middleware/authMiddleware";

const handler = async (req, res) => {
  if (req.method === "PUT") {
    try {
      const brandInfo = req.body;
      if (!brandInfo.id) {
        res.status(400).json("Brand ID is required!");
      }

      const brand = await updateBrand(brandInfo);

      //TODO: Log operation

      res.status(200).json({
        brand,
        message: "Brand has been updated successfully!",
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

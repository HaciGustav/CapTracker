import { createBrand } from "@/server/stock/brandService";
import { withAuth } from "@/server/utils/middleware/authMiddleware";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const brandInfo = req.body;
      const brand = await createBrand(brandInfo);

      res
        .status(200)
        .json({ brand, message: `Brand: ${brand.name} created successfully!` });
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

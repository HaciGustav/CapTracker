import { deleteCookie } from "cookies-next";

const handler = async (req, res) => {
  if (req.method === "POST") {
    try {
      const result = await deleteCookie("token", { req, res, httpOnly: true });
      res.status(200).json(result);
    } catch (error) {
      console.log(error);
      res.status(error.status || 500).json(error.message);
    }
  } else {
    res.status(405);
  }
};

export default handler;

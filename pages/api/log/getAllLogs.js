import { getAllLogs } from "@/server/logs/logService";
import { withAuth } from "@/server/utils/middleware/authMiddleware";

const handler = async (req, res) => {
  if (req.method === "GET") {
    try {
      const logs = await getAllLogs();

      res.status(200).json(logs);
    } catch (error) {
      console.log(error);

      res.status(error.status).json(error.message);
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default withAuth(handler);

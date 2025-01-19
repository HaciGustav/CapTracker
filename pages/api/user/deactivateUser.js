import { deactivateUser } from "@/server/users/userService";
import logger from "@/server/utils/logger/logger";
import { withAuth } from "@/server/utils/middleware/authMiddleware";

const handler = async (req, res) => {
  if (req.method === "DELETE") {
    const userID = req.headers["captracker_userid"];

    try {
      const userId = req.query?.id;
      if (!userId) {
        res.status(400).json("User ID is required!");
      }
      const user = await deactivateUser(userId);

      logger
        .meta({ type: "DEACTIVATE_USER", userID, item: user })
        .log("A new user created!");

      res.status(200).json({
        user,
        message: `User: ${user.username} created successfully!`,
      });
    } catch (error) {
      logger
        .meta({ type: "CREATE", userID, payload: req.body })
        .error(error.status, error.message);

      console.log(error);
      res.status(error.status).json(error.message);
    }
  } else {
    res.setHeader("Allow", ["DELETE"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

export default withAuth(handler);

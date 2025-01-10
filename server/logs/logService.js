import prisma from "../db";
import { systemFailLog } from "../utils/logger/_logger";

export const getAllLogs = async () => {
  try {
    const logs = await prisma.log.findMany();
    return logs;
  } catch (error) {
    console.log(error);
    systemFailLog(JSON.stringify(error));
  }
};

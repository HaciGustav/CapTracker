import prisma from "../db";

export const getAllLogs = async () => {
  try {
    const logs = await prisma.$queryRaw`
    SELECT
          id
          ,timestamp
          ,level
          ,message
          ,meta
    FROM public.captracker_logs
    WHERE coalesce(meta,'') != ''
    ORDER BY id DESC
`;
    const logsReturn = logs.map((log) => ({
      ...log,
      id: Number(log.id),
      timestamp: log.timestamp.toISOString(),
      meta: JSON.parse(log.meta),
    }));

    return logsReturn;
  } catch (error) {
    console.log(error);
  }
};

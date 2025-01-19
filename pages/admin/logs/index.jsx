import { Box, Typography } from "@mui/material";
import { isUserAdminBySession } from "@/helper/userRoleValidation";
import useAdminCalls from "@/hooks/useAdminCalls";
import { getSession } from "next-auth/react";
import { useEffect, useState } from "react";
import LogModal from "@/components/modals/LogModal";
import { useSelector } from "react-redux";
import LogsTable from "@/components/tables/LogsTable";
const Logs = () => {
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});
  const { getLogs } = useAdminCalls();
  const { logs } = useSelector((state) => state.stock);

  useEffect(() => {
    getLogs();
  }, []);

  return (
    <Box sx={{ maxWidth: "100vw" }}>
      <LogModal open={open} setOpen={setOpen} info={info} />

      <Typography
        variant="h4"
        color="error"
        mb={6}
        sx={{
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        Log Details
      </Typography>

      {logs?.length > 0 && (
        <LogsTable setOpen={setOpen} setInfo={setInfo} logs={logs} />
      )}
    </Box>
  );
};

export default Logs;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth/login",
        permanent: false,
      },
    };
  } else if (!isUserAdminBySession(session)) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  try {
    const logs = await prisma.$queryRaw`
        SELECT 
        id
        ,timestamp
        ,level
        ,message
        ,meta
        FROM public.captracker_logs
        WHERE COALESCE(meta, '') <> ''
        ORDER BY id ASC
    `;
    const logsReturn = logs.map((log) => ({
      ...log,
      id: Number(log.id),
      timestamp: log.timestamp.toISOString(),
      meta: JSON.parse(log.meta),
      errsole_id: "",
    }));

    return {
      props: { session, logs: logsReturn },
    };
  } catch (error) {
    console.log(error);
  }

  return {
    props: { session },
  };
};

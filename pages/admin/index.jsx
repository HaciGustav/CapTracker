import { isUserAdminBySession } from "@/helper/userRoleValidation";
import useAdminCalls from "@/hooks/useAdminCalls";
import prisma from "@/server/db";
import { getSession } from "next-auth/react";
import React, { useEffect } from "react";

const AdminPanel = ({ logs }) => {
  const { getAllLogs } = useAdminCalls();

  useEffect(() => {
    console.log(logs);
  }, []);

  return <div>AdminPanel</div>;
};

export default AdminPanel;

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
        SELECT * FROM public.captracker_logs
        WHERE coalesce(meta,'') != ''
        ORDER BY id DESC
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

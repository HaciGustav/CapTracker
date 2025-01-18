import { isUserAdminBySession } from "@/helper/userRoleValidation";

import { getSession } from "next-auth/react";
import React, { useEffect } from "react";

const AdminPanel = ({ logs }) => {
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

  return {
    props: { session },
  };
};

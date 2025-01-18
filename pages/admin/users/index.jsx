import LogsTable from "@/components/tables/LogsTable";
import UsersTable from "@/components/tables/UsersTable";
import { isUserAdminBySession } from "@/helper/userRoleValidation";
import useSortColumn from "@/hooks/useSortColumn";
import { Box, Typography } from "@mui/material";
import { getSession } from "next-auth/react";
const Users = () => {
  return (
    <Box>
      <Typography
        variant="h4"
        color="error"
        mb={6}
        sx={{
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        Users
      </Typography>

      <UsersTable />
    </Box>
  );
};

export default Users;

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

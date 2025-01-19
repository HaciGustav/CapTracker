import UserModal from "@/components/modals/UserModal";
import UsersTable from "@/components/tables/UsersTable";
import Button from "@mui/material/Button";
import { Box, Typography } from "@mui/material";
import { isUserAdminBySession } from "@/helper/userRoleValidation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getSession } from "next-auth/react";
import useAdminCalls from "@/hooks/useAdminCalls";

const Users = () => {
  const { getUsers } = useAdminCalls();
  const { users, loading } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Box>
      <Typography
        variant="h4"
        color="error"
        mb={2}
        sx={{
          fontWeight: "bold",
          textTransform: "uppercase",
        }}
      >
        Users
      </Typography>

      <Button variant="contained" onClick={() => setOpen(true)}>
        New User
      </Button>

      <UserModal
        info={info}
        setInfo={setInfo}
        open={open}
        setOpen={setOpen}
      />

      {users?.length > 0 && (
        <UsersTable
          setOpen={setOpen}
          setInfo={setInfo}
          users={users}
        />
      )}
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

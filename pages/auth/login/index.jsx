import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Formik } from "formik";
import LockIcon from "@mui/icons-material/Lock";
// import image from "/assets/result.svg";

import LoginForm, { loginSchema } from "@/components/LoginForm";

import useAuthCalls from "@/hooks/useAuthCalls";
import Link from "next/link";
import { useRouter } from "next/router";

const Login = () => {
  const { login } = useAuthCalls();
  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12} mb={3}>
          <Typography variant="h3" color="primary" align="center">
            CAPTRACKER{" "}
          </Typography>
        </Grid>

        <Grid item xs={12} sm={10} md={6}>
          <Avatar
            sx={{
              backgroundColor: "secondary.light",
              m: "auto",
              width: 40,
              height: 40,
            }}
          >
            <LockIcon size="30" />
          </Avatar>
          <Typography
            variant="h4"
            align="center"
            mb={4}
            color="secondary.light"
          >
            Login
          </Typography>

          <Formik
            initialValues={{ email: "", password: "" }}
            // validationSchema={loginSchema}
            onSubmit={(values, actions) => {
              login(values);
              actions.setSubmitting(false);
            }}
            component={(props) => <LoginForm {...props} />}
          ></Formik>
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link href={"/auth/register"}>Don't you have an account?</Link>
          </Box>
        </Grid>

        <Grid item xs={10} sm={7} md={6}>
          <Container>
            <img src={"/assets/result.svg"} alt="img" />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;

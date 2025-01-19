import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";

import useAuthCalls from "@/hooks/useAuthCalls";
import Link from "next/link";
import { useRouter } from "next/router";
import { getSession, signIn } from "next-auth/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import Head from "next/head";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { toastErrorNotify, toastWarnNotify } from "@/helper/ToastNotify";

const Login = () => {
  const { login, sendResetMail } = useAuthCalls();

  const [inputVal, setInputVal] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setInputVal({ ...inputVal, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true);
    await login(inputVal).finally(() => setIsLoading(false));
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (!inputVal.email) {
      toastWarnNotify("Email is required!");
      return;
    }
    setIsLoading(true);
    sendResetMail(inputVal.email).finally(() => setIsLoading(false));
  };

  return (
    <>
      <Head>
        <title>CapTracker Login</title>
      </Head>
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
            <Typography
              variant="h3"
              color="primary"
              align="center"
              sx={{
                fontWeight: "bold",
              }}
            >
              CapTracker
            </Typography>
          </Grid>

          <Grid
            item
            xs={12}
            sm={10}
            md={6}
            component={"form"}
            onSubmit={handleSubmit}
          >
            <Avatar
              sx={{
                backgroundColor: "secondary.light",
                m: "auto",
                width: 60,
                height: 60,
              }}
            >
              <LockIcon size="30" />
            </Avatar>
            <Typography
              variant="h3"
              align="center"
              mt={4}
              mb={4}
              color="secondary.light"
              sx={{
                fontWeight: "bold",
                textTransform: "uppercase",
              }}
            >
              Login
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="Email"
                name="email"
                id="email"
                type="email"
                variant="outlined"
                value={inputVal?.email || ""}
                onChange={handleChange}
              />
              <TextField
                label="Password"
                name="password"
                id="password"
                type="password"
                variant="outlined"
                value={inputVal?.password || ""}
                onChange={handleChange}
              />
              <LoadingButton
                loading={isLoading}
                loadingPosition="center"
                variant="contained"
                type="submit"
              >
                Submit
              </LoadingButton>
              <LoadingButton
                loading={isLoading}
                loadingPosition="center"
                variant="contained"
                onClick={handleResetPassword}
                color="secondary"
              >
                Reset Password
              </LoadingButton>
            </Box>
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Link href={"/auth/register"}>
                Don't have an account? Register here!
              </Link>
            </Box>
            {/* <Box sx={{ textAlign: "center", mt: 2, color: "gray" }}>
              <Link href={"/auth/reset"}>Forgot your password? Reset here!</Link>
            </Box> */}
          </Grid>

          <Grid item xs={10} sm={7} md={6}>
            <Container>
              <img src={"/assets/result.svg"} alt="img" />
            </Container>
          </Grid>
        </Grid>
      </Container>{" "}
    </>
  );
};

export default Login;

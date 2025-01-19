import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import LockIcon from "@mui/icons-material/Lock";
import useAuthCalls from "@/hooks/useAuthCalls";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import Head from "next/head";
import { TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";

const ResetPassword = () => {
  const [inputVal, setInputVal] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { resetPassword } = useAuthCalls();

  const handleChange = (e) => {
    setInputVal({ ...inputVal, [e.target.name]: e.target.value });
    setErrorMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputVal?.password !== inputVal?.password2) {
      setErrorMessage("Passwords must be same");
    }

    const token = router.query?.token;
    const { password } = inputVal;
    setIsLoading(true);
    resetPassword(token, password);
    setIsLoading(false);
    router.push("/auth/login");
  };

  return (
    <>
      <Head>
        <title>Password Recovery</title>
      </Head>
      <Container maxWidth="lg">
        <Grid
          container
          justifyContent="center"
          alignContent="center"
          sx={{
            height: "100vh",
            p: 2,
          }}
        >
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
                width: 80,
                height: 80,
              }}
            >
              <LockIcon fontSize="large" />
            </Avatar>
            <Typography
              variant="h5"
              align="center"
              mt={4}
              mb={4}
              color="secondary.light"
            >
              Reset Password
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <TextField
                label="New Password"
                name="password"
                id="password"
                variant="outlined"
                type="password"
                value={inputVal?.password || ""}
                onChange={handleChange}
              />
              <TextField
                label="Repeat Password"
                name="password2"
                id="password2"
                variant="outlined"
                type="password"
                value={inputVal?.password2 || ""}
                onChange={handleChange}
                helperText={errorMessage ? errorMessage : ""}
                error={errorMessage}
              />

              <LoadingButton
                loading={isLoading}
                loadingPosition="center"
                variant="contained"
                type="submit"
              >
                Submit
              </LoadingButton>
            </Box>

            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Link href={"/auth/register"}>Create new account</Link>
            </Box>
          </Grid>
        </Grid>
      </Container>{" "}
    </>
  );
};

export default ResetPassword;

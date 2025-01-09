import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import Grid from "@mui/material/Grid";
import { Box, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import useAuthCalls from "@/hooks/useAuthCalls";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { LoadingButton } from "@mui/lab";

const Register = () => {
  const { register } = useAuthCalls();

  const [inputVal, setInputVal] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setInputVal({ ...inputVal, [e.target.name]: e.target.value });
    console.log(inputVal);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await register(inputVal).finally(() => setIsLoading(false));
  };

  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        component={"form"}
        onSubmit={handleSubmit}
        rowSpacing={{ sm: 3 }}
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h3" color="primary" align="center"
            sx={{
              fontWeight: "bold"
            }}>
            CapTracker
          </Typography>
        </Grid>

        <Grid item xs={12} sm={10} md={6}>
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
              textTransform: "uppercase"
            }}>
            Register
          </Typography>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="User Name"
              name="username"
              id="userName"
              type="text"
              variant="outlined"
              value={inputVal.username}
              onChange={handleChange}
            />
            <TextField
              label="First Name"
              name="firstname"
              id="firstName"
              type="text"
              variant="outlined"
              value={inputVal.firstname}
              onChange={handleChange}
            />
            <TextField
              label="Last Name"
              name="lastname"
              type="text"
              variant="outlined"
              value={inputVal.lastname}
              onChange={handleChange}
            />
            <TextField
              label="Email"
              name="email"
              id="email"
              type="email"
              variant="outlined"
              value={inputVal.email}
              onChange={handleChange}
            />
            <TextField
              label="Password"
              name="password"
              id="password"
              type="password"
              variant="outlined"
              value={inputVal.password}
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
          </Box>
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link href={"/auth/login"}>Already have an account?</Link>
          </Box>
        </Grid>

        <Grid item xs={0} sm={7} md={6}>
          <Container>
            <img src={"/assets/result.svg"} alt="image" />
          </Container>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Register;

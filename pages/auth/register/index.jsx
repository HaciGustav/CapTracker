import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import LockIcon from "@mui/icons-material/Lock";
import { Formik } from "formik";
import Grid from "@mui/material/Grid";
import RegisterForm, { registerSchema } from "@/components/RegisterForm";
import { Box } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import useAuthCalls from "@/hooks/useAuthCalls";

const Register = () => {
  const router = useRouter();
  const { register } = useAuthCalls();
  return (
    <Container maxWidth="lg">
      <Grid
        container
        justifyContent="center"
        direction="row-reverse"
        rowSpacing={{ sm: 3 }}
        sx={{
          height: "100vh",
          p: 2,
        }}
      >
        <Grid item xs={12}>
          <Typography variant="h3" color="primary" align="center">
            CapTracker
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
            mb={2}
            color="secondary.light"
          >
            Register
          </Typography>

          <Formik
            initialValues={{
              username: "",
              first_name: "",
              last_name: "",
              email: "",
              password: "",
            }}
            // validationSchema={registerSchema}
            onSubmit={(values, actions) => {
              console.log(values);
              register(values);
              // actions.resetForm();
              actions.setSubmitting(false);
            }}
            component={(props) => <RegisterForm {...props} />}
          ></Formik>
          <Box sx={{ textAlign: "center", mt: 2 }}>
            <Link href={"/auth/login"}>Do you have an account?</Link>
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

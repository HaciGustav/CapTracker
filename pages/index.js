import Head from "next/head";
import { getSession } from "next-auth/react";
import { Box, Typography } from "@mui/material";
import KpiCards from "@/components/KpiCards";
import Charts from "@/components/Charts";

export default function Home() {
  return (
    <>
      <Head>
        <title>CapTracker</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box>
        <Typography variant="h4" color="error" mb={4}>
          Dashboard
        </Typography>
        <KpiCards />
        <Charts />
      </Box>
    </>
  );
}
// export const getServerSideProps = async (context) => {
//   const session = await getSession(context);

//   if (!session) {
//     return {
//       redirect: {
//         destination: "/auth/login",
//         permanent: false,
//       },
//     };
//   }

//   // console.log(session);

//   let config = {
//     headers: {
//       Authorization: "Bearer " + session.user.token,
//       accept: "*/*",
//     },
//   };
// };
import "../styles/globals.css";
import Layout from "@/layout";
import { useEffect, useMemo, useState } from "react";
import { ThemeProvider, colors, createTheme } from "@mui/material";
import { useRouter } from "next/router";
import { Provider } from "react-redux";
import CssBaseline from "@mui/material/CssBaseline";
// import { SessionProvider, getSession } from "next-auth/react";
import store from "@/redux/app/store";
import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";

// import Providers from "@/redux/Provider";
const Loading = () => <p>LOADING...</p>;

export default function App({ Component, pageProps }) {
  const [mode, setMode] = useState("light");
  const router = useRouter();

  const toggleTheme = () => {
    setMode(mode === "dark" ? "light" : "dark");

    localStorage.setItem("theme", mode === "dark" ? "light" : "dark");
  };

  const getDesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            // palette values for light mode
            primary: { main: "#80CFA9"},
            secondary: { main: "#FFD1A9"},
            background: { default: "#FFFFFF"},
            text: { primary: "#212121"},
            error: { main: "#E57373" },
            success: { main: "#66BB6A" },
            warning: { main: "#FFEE58" },
            info: { main: "#64B5F6" },

            navbar: { main: "#e10000" },
            dateInputColor: {
              main: "#000",
            },
          }
        : {
            // palette values for dark mode
            primary: { main: "#80CFA9"},
            secondary: { main: "#CC9D7A"},
            background: { default: "#121212"},
            text: { primary: "#E0E0E0"},
            error: { main: "#EF5350" },
            success: { main: "#81C784" },
            warning: { main: "#FDD835" },
            info: { main: "#4FC3F7" },

            toggleBtn: { main: "#008000" },
            dateInputColor: {
              main: "#fff",
            },
          }),
    },
    components: {
      MuiInputLabel: {
        defaultProps: {
          sx: {
            "&.MuiInputLabel-shrink": {
              top: "3px",
            },
          },
        },
        styleOverrides: {
          root: {
            fontSize: "1rem",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            fontSize: "1rem",
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            fontSize: "1rem",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: "1rem",
            color: "white",
            fontWeight: "bold"
          },
        },
      },
    },
  });

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  useEffect(() => {
    const x = localStorage.getItem("theme");
    setMode(x ? x : "light");
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <SessionProvider session={pageProps.session}>
          {router.pathname.includes("auth") && <Component {...pageProps} />}
          {!router.pathname.includes("auth") && (
            <Layout toggleTheme={toggleTheme}>
              <Component {...pageProps} />
            </Layout>
          )}
          <ToastContainer />
        </SessionProvider>
        <CssBaseline />
      </ThemeProvider>
    </Provider>
  );
}

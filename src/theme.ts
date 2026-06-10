import { createTheme } from "@mui/material/styles";

export function getTheme(mode: "light" | "dark") {
    return createTheme({
        palette: {
            mode,
            primary: {
                main: "#1b75bb",
                light: "#598db4",
                dark: "#013c69",
            },
            secondary: {
                main: "#666666",
                light: "#d6d6d6",
                dark: "#272a2c",
            },
            error: {
                main: "#ff3a1e",
                light: "#ff7961",
                dark: "#9c000a",
            },
            warning: {
                main: "#ffc500",
                light: "#ffef62",
                dark: "#b2a429"
            },
            success: {
                main: "#4caf50",
                light: "#6fbf73",
                dark: "#135f17"
            },
            ...(mode === "dark"
                ? {
                      background: {
                          default: "#2b3035",
                          paper: "#1e1e1e"
                      }
                  }
                : {
                      background: {
                          default: "#f5f5f5",
                          paper: "#fff"
                      }
                  })
        },
        typography: {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif'
        },
        components: {
            MuiDrawer: {
                styleOverrides: {
                    paper: {
                        backgroundColor: mode === "dark" ? "#343a40" : "#1e293b",
                        color: "#fff"
                    }
                }
            },
            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: mode === "dark" ? "#212529" : "#fff",
                        color: mode === "dark" ? "#fff" : "#333"
                    }
                }
            }
        }
    });
}

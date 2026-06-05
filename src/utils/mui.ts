import { createTheme } from "@mui/material/styles";

export function getTheme(mode: "light" | "dark") {
    return createTheme({
        palette: {
            mode,
            primary: {
                main: "#1b75bb"
            },
            secondary: {
                main: "#666666"
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

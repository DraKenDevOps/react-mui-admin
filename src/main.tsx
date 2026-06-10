import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeModeProvider, useThemeMode } from "./contexts/ThemeModeContext";
import { getTheme } from "./theme";
import App from "./App";
import "./index.css";

function ThemedApp() {
    const { mode } = useThemeMode();
    return (
        <ThemeProvider theme={getTheme(mode)}>
            <CssBaseline />
            <App />
        </ThemeProvider>
    );
}

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <ThemeModeProvider>
            <ThemedApp />
        </ThemeModeProvider>
    </StrictMode>
);

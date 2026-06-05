import { IconButton } from "@mui/material";
import { DarkMode, LightMode } from "@mui/icons-material";
import { useThemeMode } from "../contexts/ThemeModeContext";

export default function ThemeToggler() {
    const { mode, toggle } = useThemeMode();

    return (
        <IconButton onClick={toggle} color="inherit">
            {mode === "dark" ? <LightMode /> : <DarkMode />}
        </IconButton>
    );
}

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

const THEME_KEY = "APP_THEME";

interface ThemeModeContextValue {
    mode: "light" | "dark";
    toggle: () => void;
}

const ThemeModeContext = createContext<ThemeModeContextValue | null>(null);

export function ThemeModeProvider({ children }: { children: ReactNode }) {
    const [mode, setMode] = useState<"light" | "dark">(() => {
        return (localStorage.getItem(THEME_KEY) as "light" | "dark") || "light";
    });

    const toggle = useCallback(() => {
        setMode((prev) => {
            const next = prev === "light" ? "dark" : "light";
            localStorage.setItem(THEME_KEY, next);
            return next;
        });
    }, []);

    return (
        <ThemeModeContext.Provider value={{ mode, toggle }}>
            {children}
        </ThemeModeContext.Provider>
    );
}

export function useThemeMode() {
    const ctx = useContext(ThemeModeContext);
    if (!ctx) throw new Error("useThemeMode must be used within ThemeModeProvider");
    return ctx;
}

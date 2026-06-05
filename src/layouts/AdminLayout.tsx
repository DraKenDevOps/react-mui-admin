import { useState, useMemo } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";
import { Box, AppBar, Toolbar, Typography, Button, IconButton, Breadcrumbs, Link, useMediaQuery, useTheme } from "@mui/material";
import { Logout, Menu, Home } from "@mui/icons-material";
import Sidebar, { drawerWidthOpen } from "./Sidebar";
import ThemeToggler from "../components/ThemeToggler";

export default function AdminLayout() {
    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const drawerWidth = isMobile || sidebarOpen ? drawerWidthOpen : 64;

        const location = useLocation();

    const labelMap: Record<string, string> = {
        "app": "Dashboard",
        "create-profile": "Create Profile",
        "edit-profile": "Edit Profile",
        "history": "History",
        "security": "Security",
        "setting": "Settings",
        "about": "About",
        "contact": "Contact",
        "review": "Review"
    };

    const breadcrumbs = useMemo(() => {
        const segments = location.pathname.split("/").filter(Boolean);
        const crumbs: { label: string; path: string }[] = [];
        let accum = "";
        for (const seg of segments) {
            accum += `/${seg}`;
            crumbs.push({ label: labelMap[seg] || seg, path: accum });
        }
        return crumbs;
    }, [location.pathname]);

    const handleToggle = () => {
        setSidebarOpen((prev) => !prev);
    };

    const handleLogout = () => {
        localStorage.removeItem("ACCESS_TOKEN");
        navigate("/login", { replace: true });
    };

    return (
        <Box sx={{ display: "flex" }}>
            <Sidebar open={sidebarOpen} onToggle={handleToggle} />
            <AppBar
                position="fixed"
                sx={{
                    width: isMobile ? "100%" : `calc(100% - ${drawerWidth}px)`,
                    ml: isMobile ? 0 : `${drawerWidth}px`,
                    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease"
                }}
                elevation={0}
            >
                <Toolbar>
                    <IconButton color="inherit" edge="start" onClick={handleToggle} sx={{ mr: 1 }}>
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600 }}></Typography>
                    <ThemeToggler />
                    <Button color="inherit" onClick={handleLogout} startIcon={<Logout />} sx={{ textTransform: "none" }}>
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    mt: 8,
                    minHeight: "calc(100vh - 64px)",
                    backgroundColor: "background.default",
                    transition: "margin-left 0.3s ease, width 0.3s ease",
                    ml: isMobile ? 0 : undefined
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {breadcrumbs.length > 0 ? breadcrumbs[breadcrumbs.length - 1].label : ""}
                    </Typography>
                    <Breadcrumbs aria-label="breadcrumb" sx={{ color: "text.secondary", fontSize: "0.875rem" }}>
                        <Link
                            underline="hover"
                            color="inherit"
                            href="/app"
                            onClick={(e) => { e.preventDefault(); navigate("/app"); }}
                            sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                        >
                            <Home sx={{ fontSize: 16 }} />
                        </Link>
                        {breadcrumbs.map((crumb, idx) => {
                            const isLast = idx === breadcrumbs.length - 1;
                            return isLast ? (
                                <Typography key={crumb.path} color="text.primary" sx={{ fontWeight: 600, fontSize: "0.875rem" }}>
                                    {crumb.label}
                                </Typography>
                            ) : (
                                <Link
                                    key={crumb.path}
                                    underline="hover"
                                    color="inherit"
                                    href={crumb.path}
                                    onClick={(e) => { e.preventDefault(); navigate(crumb.path); }}
                                    sx={{ fontSize: "0.875rem" }}
                                >
                                    {crumb.label}
                                </Link>
                            );
                        })}
                    </Breadcrumbs>
                </Box>
                <Outlet />
            </Box>
        </Box>
    );
}
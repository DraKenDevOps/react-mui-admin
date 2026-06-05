import { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    Drawer,
    Box,
    Typography,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Divider,
    Collapse,
    useMediaQuery,
    useTheme
} from "@mui/material";
import { ExpandMore, PushPin, PushPinOutlined } from "@mui/icons-material";
import menuItems, { type MenuItem } from "./Menu";
import {
    sidebarSx,
    sidebarHoverSx,
    mobileSidebarSx,
    logoBoxSx,
    headerSx,
    listItemIconSx,
    listItemSx,
    childItemSx,
    chevronSx,
    drawerWidthOpen,
    drawerWidthClosed
} from "./sx";

interface SidebarProps {
    open: boolean;
    onToggle: () => void;
}

const HOVER_DISABLED_KEY = "SIDEBAR_HOVER_DISABLED";

function hasActiveChild(item: MenuItem, pathname: string): boolean {
    if (!item.children) return false;
    return item.children.some((child) => child.path === pathname);
}

function SidebarContent({ open }: { open: boolean }) {
    const location = useLocation();
    const navigate = useNavigate();
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    useEffect(() => {
        const next: Record<string, boolean> = {};
        menuItems.forEach((item) => {
            if (item.children && hasActiveChild(item, location.pathname)) {
                next[item.label!] = true;
            }
        });
        setExpanded((prev) => ({ ...prev, ...next }));
    }, [location.pathname]);

    const toggleExpand = (label: string) => {
        setExpanded((prev) => ({ ...prev, [label]: !prev[label] }));
    };

    const isParentActive = (item: MenuItem) => {
        if (item.path) return location.pathname === item.path;
        if (item.children) return hasActiveChild(item, location.pathname);
        return false;
    };

    return (
        <>
            <Box sx={logoBoxSx(open)}>
                <Typography variant="h6" sx={{ fontWeight: 700, fontSize: open ? "1rem" : "0.75rem" }}>
                    {open ? "BIS\u00a0Admin" : "BA"}
                </Typography>
            </Box>
            <Divider sx={{ borderColor: "rgba(255,255,255,0.12)" }} />
            <List sx={{ px: open ? 1 : 0.5, py: 1 }}>
                {menuItems.map((item, idx) => {
                    if (item.header) {
                        return (
                            <Box key={`header-${idx}`} sx={{ mt: idx > 0 ? 1.5 : 0 }}>
                                <Typography sx={headerSx(open)}>{open ? item.header : "—"}</Typography>
                            </Box>
                        );
                    }

                    if (item.children) {
                        const isExpanded = !!expanded[item.label!];
                        const active = isParentActive(item);
                        return (
                            <Box key={item.label}>
                                <ListItemButton
                                    selected={active}
                                    onClick={() => toggleExpand(item.label!)}
                                    sx={listItemSx(open)}
                                >
                                    <ListItemIcon sx={listItemIconSx(open)}>{item.icon}</ListItemIcon>
                                    {open && <ListItemText primary={item.label} />}
                                    {open && (
                                        <ExpandMore sx={chevronSx(open) && { transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)" }} />
                                    )}
                                </ListItemButton>
                                <Collapse in={open && isExpanded} timeout="auto" unmountOnExit>
                                    <List disablePadding>
                                        {item.children.map((child) => {
                                            const isChildActive = location.pathname === child.path;
                                            return (
                                                <ListItemButton
                                                    key={child.path}
                                                    selected={isChildActive}
                                                    onClick={() => child.path && navigate(child.path)}
                                                    sx={childItemSx(open)}
                                                >
                                                    <ListItemIcon sx={listItemIconSx(open)}>{child.icon}</ListItemIcon>
                                                    {open && <ListItemText primary={child.label} />}
                                                </ListItemButton>
                                            );
                                        })}
                                    </List>
                                </Collapse>
                            </Box>
                        );
                    }

                    const isActive = location.pathname === item.path;
                    return (
                        <ListItemButton
                            key={item.path}
                            selected={isActive}
                            onClick={() => item.path && navigate(item.path)}
                            sx={listItemSx(open)}
                        >
                            <ListItemIcon sx={listItemIconSx(open)}>{item.icon}</ListItemIcon>
                            {open && <ListItemText primary={item.label} />}
                        </ListItemButton>
                    );
                })}
            </List>
        </>
    );
}

export default function Sidebar({ open, onToggle }: SidebarProps) {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down("md"));
    const [hovered, setHovered] = useState(false);

    const [hoverDisabled, setHoverDisabled] = useState(() => {
        return localStorage.getItem(HOVER_DISABLED_KEY) === "true";
    });

    const actualOpen = open || (hovered && !open && !hoverDisabled);

    const toggleHoverPin = useCallback(() => {
        setHoverDisabled((prev) => {
            const next = !prev;
            localStorage.setItem(HOVER_DISABLED_KEY, String(next));
            return next;
        });
    }, []);

    if (isMobile) {
        return (
            <Drawer variant="temporary" anchor="left" open={open} onClose={onToggle} sx={mobileSidebarSx} ModalProps={{ keepMounted: true }}>
                <SidebarContent open={true} />
            </Drawer>
        );
    }

    return (
        <Box
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            sx={{
                width: open ? drawerWidthOpen : drawerWidthClosed,
                flexShrink: 0,
                transition: "width 0.3s ease"
            }}
        >
            <Drawer
                variant="permanent"
                anchor="left"
                sx={actualOpen !== open ? sidebarHoverSx(actualOpen) : sidebarSx(open)}
            >
                <Box
                    sx={{
                        position: "absolute",
                        bottom: 8,
                        right: 8,
                        zIndex: 1,
                        ...(!open && hovered && { display: "block" }),
                        ...(!open && !hovered && { display: "none" })
                    }}
                >
                    <Box
                        component="span"
                        onClick={toggleHoverPin}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: 24,
                            height: 24,
                            borderRadius: 1,
                            cursor: "pointer",
                            color: "rgba(255,255,255,0.5)",
                            "&:hover": { color: "#fff", backgroundColor: "rgba(255,255,255,0.1)" }
                        }}
                    >
                        {hoverDisabled ? <PushPinOutlined sx={{ fontSize: 16 }} /> : <PushPin sx={{ fontSize: 16 }} />}
                    </Box>
                </Box>
                <SidebarContent open={actualOpen} />
            </Drawer>
        </Box>
    );
}

export { drawerWidthOpen };
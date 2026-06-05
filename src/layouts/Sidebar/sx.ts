export const drawerWidthOpen = 260;
export const drawerWidthClosed = 64;

export const sidebarSx = (open: boolean) => ({
    width: open ? drawerWidthOpen : drawerWidthClosed,
    flexShrink: 0,
    whiteSpace: "nowrap",
    transition: "width 0.3s ease",
    "& .MuiDrawer-paper": {
        width: open ? drawerWidthOpen : drawerWidthClosed,
        boxSizing: "border-box",
        overflowX: "hidden",
        transition: "width 0.3s ease",
        borderRight: "none"
    }
});

export const sidebarHoverSx = (actualOpen: boolean) => ({
    width: drawerWidthClosed,
    flexShrink: 0,
    "& .MuiDrawer-paper": {
        width: actualOpen ? drawerWidthOpen : drawerWidthClosed,
        boxSizing: "border-box",
        overflowX: "hidden",
        transition: "width 0.3s ease",
        borderRight: "none",
        zIndex: 1200
    }
});

export const mobileSidebarSx = {
    "& .MuiDrawer-paper": {
        width: drawerWidthOpen,
        boxSizing: "border-box",
        borderRight: "none"
    }
};

export const logoBoxSx = (open: boolean) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: open ? "flex-start" : "center",
    gap: 1,
    px: open ? 2 : 0,
    py: 2,
    minHeight: 64
});

export const headerSx = (open: boolean) => ({
    px: open ? 2 : 0,
    py: 0.5,
    textAlign: open ? "left" : "center" as const,
    fontSize: "0.65rem",
    fontWeight: 700,
    letterSpacing: 1,
    color: "rgba(255,255,255,0.35)",
    textTransform: "uppercase" as const,
    overflow: "hidden"
});

export const listItemIconSx = (open: boolean) => ({
    color: "rgba(255,255,255,0.7)",
    minWidth: 0,
    justifyContent: "center",
    ...(open && { mr: 1.5 })
});

export const listItemSx = (open: boolean) => ({
    borderRadius: 2,
    mb: 0.25,
    justifyContent: open ? "initial" : "center",
    px: open ? 1.5 : 0,
    minHeight: 42,
    "&.Mui-selected": {
        backgroundColor: "rgba(255,255,255,0.12)",
        "&:hover": {
            backgroundColor: "rgba(255,255,255,0.18)"
        },
        "& .MuiListItemIcon-root": {
            color: "#fff"
        }
    }
});

export const childItemSx = (open: boolean) => ({
    borderRadius: 2,
    mb: 0.25,
    pl: open ? 5 : 0,
    justifyContent: open ? "initial" : "center",
    px: open ? 1.5 : 0,
    minHeight: 38,
    "& .MuiListItemIcon-root": {
        color: "rgba(255,255,255,0.5)"
    },
    "&.Mui-selected": {
        backgroundColor: "rgba(255,255,255,0.08)",
        "& .MuiListItemIcon-root": {
            color: "#90caf9"
        }
    }
});

export const chevronSx = (open: boolean) => ({
    color: "rgba(255,255,255,0.5)",
    transition: "transform 0.3s ease",
    fontSize: 18,
    ml: "auto",
    ...(!open && { display: "none" })
});

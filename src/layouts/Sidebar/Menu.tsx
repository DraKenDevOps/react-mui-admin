import DashboardIcon from "@mui/icons-material/Dashboard";
import HistoryIcon from "@mui/icons-material/History";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SecurityIcon from "@mui/icons-material/Security";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

export interface MenuItem {
    label?: string;
    path?: string;
    icon?: React.ReactNode;
    children?: MenuItem[];
    header?: string;
}

const menuItems: MenuItem[] = [
    { header: "MAIN" },
    { label: "Dashboard", path: "/app", icon: <DashboardIcon /> },
    {
        label: "Registration",
        icon: <PersonAddIcon />,
        children: [
            { label: "Create Profile", path: "/app/create-profile", icon: <FiberManualRecordIcon sx={{ fontSize: 8 }} /> },
            { label: "Edit Profile", path: "/app/edit-profile", icon: <FiberManualRecordIcon sx={{ fontSize: 8 }} /> }
        ]
    },
    { label: "History", path: "/app/history", icon: <HistoryIcon /> },
    { label: "Security", path: "/app/security", icon: <SecurityIcon /> },
    { header: "EXTRA" },
    { label: "Settings", path: "/app/setting", icon: <SettingsIcon /> },
    { label: "About", path: "/app/about", icon: <InfoIcon /> },
    { label: "Contact", path: "/app/contact", icon: <ContactMailIcon /> }
];

export default menuItems;

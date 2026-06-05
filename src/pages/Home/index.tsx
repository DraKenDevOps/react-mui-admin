import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import { PersonAdd, People, VerifiedUser, Assignment } from "@mui/icons-material";

const stats = [
    { label: "Total Registrations", value: "1,284", icon: <People />, color: "#1b75bb" },
    { label: "New Today", value: "18", icon: <PersonAdd />, color: "#2e7d32" },
    { label: "Verified", value: "1,203", icon: <VerifiedUser />, color: "#ffc400" },
    { label: "Pending Review", value: "81", icon: <Assignment />, color: "#ff1b5e" }
];

export default function Home() {
    return (
        <Box>
            <Grid container spacing={3}>
                {stats.map((stat) => (
                    <Grid size={{ xs: 12, sm: 6, md: 3 }} key={stat.label}>
                        <Card sx={{ borderRadius: 3, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}>
                            <CardContent sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                                <Box
                                    sx={{
                                        width: 52,
                                        height: 52,
                                        borderRadius: 2,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        backgroundColor: `${stat.color}15`,
                                        color: stat.color
                                    }}
                                >
                                    {stat.icon}
                                </Box>
                                <Box>
                                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                                        {stat.value}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        {stat.label}
                                    </Typography>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
    Box,
    Card,
    Typography,
    TextField,
    Button,
    InputAdornment,
    IconButton,
    Alert
} from "@mui/material";
import { Visibility, VisibilityOff, PersonOutlined, LockOutlined } from "@mui/icons-material";
import { loginContainerSx, loginCardSx, submitBtnSx } from "./sx";
import * as api from "../../services/api";
import ThemeToggler from "../../components/ThemeToggler";

interface LoginForm {
    username: string;
    password: string;
}

const TOKEN_KEY = "ACCESS_TOKEN";

export default function Login() {
    const navigate = useNavigate();
    const [showPw, setShowPw] = useState(false);
    const [error, setError] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting }
    } = useForm<LoginForm>();

    const onSubmit = async (data: LoginForm) => {
        setError("");
        try {
            const res = await api.login(data.username, data.password);
            localStorage.setItem(TOKEN_KEY, res.data.token);
            navigate("/app", { replace: true });
        } catch {
            setError("Invalid username or password");
        }
    };

    return (
        <Box sx={loginContainerSx}>
            <Box sx={{ position: "absolute", top: 16, right: 16 }}>
                <ThemeToggler />
            </Box>
            <Card sx={loginCardSx}>
                <Typography variant="h5" sx={{ fontWeight: 700, textAlign: "center", mb: 0.5 }}>
                    Biometrics Identifier System
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", mb: 3 }}>
                    Sign in to your account
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" onSubmit={handleSubmit(onSubmit)}>
                    <TextField
                        fullWidth
                        label="Username"
                        margin="normal"
                        error={!!errors.username}
                        helperText={errors.username?.message}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <PersonOutlined color="action" />
                                    </InputAdornment>
                                )
                            }
                        }}
                        {...register("username", { required: "Username is required" })}
                    />
                    <TextField
                        fullWidth
                        label="Password"
                        type={showPw ? "text" : "password"}
                        margin="normal"
                        error={!!errors.password}
                        helperText={errors.password?.message}
                        slotProps={{
                            input: {
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockOutlined color="action" />
                                    </InputAdornment>
                                ),
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPw(!showPw)} edge="end">
                                            {showPw ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }
                        }}
                        {...register("password", { required: "Password is required" })}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="large"
                        disabled={isSubmitting}
                        sx={submitBtnSx}
                    >
                        {isSubmitting ? "Signing in..." : "Sign In"}
                    </Button>
                </Box>
            </Card>
        </Box>
    );
}

import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import {
  Avatar,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { StyledAll, StyledGird, StyledPaper } from "./Login.style";
import { IUser } from "../../../types/users";
import { useLoginMutation } from "../../../redux/api/api.caller";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/features/dashboard.slice";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const [loginUser] = useLoginMutation();

  const onSubmit = async (data: IUser) => {
    try {
      const response = await loginUser(data).unwrap();
      if (response) {
        const token = response.data.token;
        dispatch(setUser(response));
        localStorage.setItem("token", token);
        navigate("/admin/dashboard");
      } else {
        toast.error("Đăng nhập thất bại sai email hoặc password", {
          theme: "colored",
          autoClose: 2000,
          position: "bottom-right",
        });
      }
    } catch (error) {
      toast.error("Đăng nhập thất bại sai email hoặc password", {
        theme: "colored",
        autoClose: 2000,
        position: "bottom-right",
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  return (
    <>
      <StyledAll>
        <ToastContainer />
        <Grid>
          <StyledPaper elevation={10}>
            <StyledGird>
              <Avatar style={{ backgroundColor: "#1bbd7e", margin: "8px 0" }}>
                <LockIcon />
              </Avatar>
              <Typography component="h2" variant="h5">
                Sign In
              </Typography>
            </StyledGird>
            <form onSubmit={handleSubmit(onSubmit)}>
              <TextField
                label="UserName"
                placeholder="Enter your UserName"
                variant="standard"
                fullWidth
                {...register("username", { required: true })}
                error={!!errors.username}
                helperText={errors.username && errors.username.message}
              />
              <TextField
                label="Password"
                placeholder="Enter password"
                type={showPassword ? "text" : "password"}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                variant="standard"
                fullWidth
                {...register("password", { required: true })}
                error={!!errors.password}
                helperText={errors.password && errors.password.message}
              />
              <FormControlLabel
                control={<Checkbox name="checkedB" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                color="primary"
                variant="contained"
                style={{ margin: "8px 0" }}
                fullWidth
              >
                Sign in
              </Button>
            </form>
          </StyledPaper>
        </Grid>
      </StyledAll>
    </>
  );
};

export default Login;

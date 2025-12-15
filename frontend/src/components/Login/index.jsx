import "./styles.css";
import { AppBar, Box, Button, TextField, Typography } from "@mui/material";
import { use } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setUser }) {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:8081/api/user/login", {
      method: "post",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })
    if (res.status === 200) {
      alert("Login successful!");
      
      const user = await res.json();
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
      navigate("/");
    } else {
      alert("Wrong username or password" );
    }
  }
 
  return (
    <Box id="login-box" component="form" onSubmit={handleLogin}>
      <Typography variant="h4">Login</Typography>
      <br />
      <TextField
        label="Username"
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" fullWidth type="submit">Login</Button>
    </Box>
  )
}

export default Login;
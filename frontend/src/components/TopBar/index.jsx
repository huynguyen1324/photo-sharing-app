import { AppBar, Button, Toolbar, Typography } from "@mui/material";

import "./styles.css";
import { Link, useNavigate } from "react-router-dom";

function TopBar({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('user');
      setUser(null);
      navigate('/login');
    }
  }

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        <Typography
          variant="h5"
          component={Link} to="/"
          color="inherit"
          sx={{ flexGrow: 1, textDecoration: "none" }}
        >
          Photo Sharing App
        </Typography>
        <div id="right-topbar">
          {user ? (
            <>
              <Typography>Hi, {user.first_name} {user.last_name}!</Typography>
              <Button variant="contained" onClick={handleLogout}>LOGOUT</Button>
            </>
          ) : (
            <>
              <Button variant="contained" href="/login">LOGIN</Button>
              <Button variant="contained" href="/register">REGISTER</Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar >
  );
}

export default TopBar;

import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

import "./styles.css";
import { useNavigate } from "react-router-dom";

/**
 * Define TopBar, a React component of Project 4.
 */
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
        <Typography variant="h5" color="inherit" sx={{ flexGrow: 1 }}>
          Photo Sharing App
        </Typography>
        {user && (
          <Typography variant="h6" sx={{ marginRight: 2 }}>
            Hi, {user.first_name} {user.last_name}!
          </Typography>
        )}
        <Box>
          {user ? (
            <Button variant="contained" onClick={handleLogout}>
              <Typography variant="h6">Logout</Typography>
            </Button>
          ) : (
            <Button variant="contained" href="/login">
              <Typography variant="h6">Login</Typography>
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;

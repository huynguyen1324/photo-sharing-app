import { AppBar, Button, Toolbar, Typography } from "@mui/material";
import "./styles.css";
import { Link, useNavigate } from "react-router-dom";
import { useRef } from "react";

function TopBar({ user, setUser }) {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const uploadRef = useRef(null);

  const handleClickUpload = () => {
    uploadRef.current.click();
  }

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      alert("Cannot upload this photo");
      return;
    }

    const formData = new FormData();
    formData.append("photo", file);
    formData.append("userId", user._id);

    try {
      const res = await fetch(`${API_URL}/api/photo/upload`, {
        method: "POST",
        body: formData
      })
      const savedPhoto = await res.json();
      navigate(`/photos/${savedPhoto._id}`);
    } catch (error) {
      console.error("Error uploading photo: " + error);
    }
  }

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
        <Typography variant="h5" sx={{ flexGrow: 1 }}>
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>Photo Sharing App</Link>
        </Typography>
        <div id="right-topbar">
          {user ? (
            <>
              <Typography>Hi, {user.first_name} {user.last_name}!</Typography>
              <Button variant="contained" color="success" onClick={handleClickUpload}>UPLOAD PHOTO</Button>
              <input
                type="file"
                accept="image/*"
                style={{ display: 'none' }}
                ref={uploadRef}
                onChange={handleUploadPhoto}
              />
              <Button variant="contained" color="error" onClick={handleLogout}>LOGOUT</Button>
            </>
          ) : (
            <>
              <Button variant="contained" component={Link} to="/login">LOGIN</Button>
              <Button variant="contained" component={Link} to="/register">REGISTER</Button>
            </>
          )}
        </div>
      </Toolbar>
    </AppBar >
  );
}

export default TopBar;

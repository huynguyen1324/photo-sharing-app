import "./styles.css";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile({ user, setUser }) {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  const [username, setUsername] = useState(user.username);
  const [password, setPassword] = useState(user.password);
  const [first_name, setFirstName] = useState(user.first_name);
  const [last_name, setLastName] = useState(user.last_name);
  const [location, setLocation] = useState(user.location);
  const [description, setDescription] = useState(user.description);
  const [occupation, setOccupation] = useState(user.occupation);

  const handleSave = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/api/user/${user._id}`, {
      method: "put",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
        first_name,
        last_name,
        location,
        description,
        occupation,
      }),
    });
    if (res.status === 200) {
      alert("Information saved successfully!");
      const updatedUser = await res.json();
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      navigate(`/users/${user._id}`);
      window.location.reload();
    } else {
      alert("Failed saving information");
    }
  };

  return (
    <Box id="register-box" component="form" onSubmit={handleSave}>
      <Typography variant="h4">Change Profile</Typography>
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
      <TextField
        label="First name"
        type="text"
        value={first_name}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <TextField
        label="Last name"
        type="text"
        value={last_name}
        onChange={(e) => setLastName(e.target.value)}
      />
      <TextField
        label="Location"
        type="text"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <TextField
        label="Description"
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <TextField
        label="Occupation"
        type="text"
        value={occupation}
        onChange={(e) => setOccupation(e.target.value)}
      />
      <Button variant="contained" fullWidth type="submit">
        Save
      </Button>
    </Box>
  );
}

export default Profile;

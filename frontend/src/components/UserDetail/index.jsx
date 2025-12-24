import { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";

function UserDetail() {
  const API_URL = process.env.REACT_APP_API_URL;
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${API_URL}/api/user/${userId}`);
      const data = await res.json();
      setUser(data);
    }
    fetchData();
  }, [userId, API_URL]);

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="h5">
        <strong>Name: </strong> {user.first_name} {user.last_name}
      </Typography>
      <Typography>
        <strong>Location: </strong> {user.location}
      </Typography>
      <Typography>
        <strong>Occupation: </strong> {user.occupation}
      </Typography>
      <Typography>
        <strong>Description: </strong> {user.description}
      </Typography>
      <br />
      <Button
        variant="contained"
        onClick={() => navigate(`/users/${user._id}/photos`)}
        sx={{ marginRight: "10px", marginBottom: "10px" }}
      >
        View all photos
      </Button>
      <Button
        variant="contained"
        onClick={() => navigate(`/users/${user._id}/comments`)}
        sx={{ marginRight: "10px", marginBottom: "10px" }}
      >
        View all comments
      </Button>
      <Button
        variant="contained"
        onClick={() => navigate(`/users/${user._id}/blogs`)}
        sx={{ marginRight: "10px", marginBottom: "10px" }}
      >
        View all blogs
      </Button>
    </div>
  );
}

export default UserDetail;

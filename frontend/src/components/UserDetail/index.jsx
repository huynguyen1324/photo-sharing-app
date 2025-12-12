import { useState, useEffect } from "react";
import { Typography, Button } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import "./styles.css";

function UserDetail() {
  const {userId} = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:8081/api/user/${userId}`);
      const data = await res.json();
      setUser(data);
    };
    fetchData();
  }, [userId]);

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div className="user-detail">
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
      <Button href={`/photos/${userId}`} variant="contained">
        View Photos
      </Button>
    </div>
  )
}

export default UserDetail;

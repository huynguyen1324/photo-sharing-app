import { useState, useEffect } from "react";
import { Button, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";

function UserDetail({ loggedInUser }) {
  const API_URL = process.env.REACT_APP_API_URL;
  const { userId } = useParams();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [friendState, setFriendState] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${API_URL}/api/user/${userId}`);
      const data = await res.json();
      setUser(data);

      if (loggedInUser && data) {
        const myFriends = loggedInUser.friends || [];
        const targetFriends = data.friends || [];

        let point = 0;
        if (myFriends.includes(data._id)) point += 1;
        if (targetFriends.includes(loggedInUser._id)) point += 2;

        const states = {
          0: "You both are not friends",
          1: "You are following this user",
          2: "This user is following you",
          3: "You both are friends",
        };
        setFriendState(states[point]);
      }
    };
    fetchData();
  }, [userId, API_URL, loggedInUser]);

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  const handleClickFollow = async () => {
    if (window.confirm("Are you sure to follow this user?")) {
      const res = await fetch(`${API_URL}/api/user/${loggedInUser._id}/follow`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });


      if (res.status === 200) {
        const updatedUser = await res.json();
        localStorage.setItem("user", JSON.stringify(updatedUser));
        window.location.reload();
      } else {
        alert("Failed to follow");
      }
    }
  };

  const handleClickUnfollow = async () => {
    if (window.confirm("Are you sure to unfollow this user?")) {
      const res = await fetch(`${API_URL}/api/user/${loggedInUser._id}/unfollow`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      if (res.status === 200) {
        const updatedUser = await res.json();
        localStorage.setItem("user", JSON.stringify(updatedUser));
        window.location.reload();
      } else {
        alert("Failed to unfollow");
      }
    }
  };

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
      {user._id !== loggedInUser._id ? (
        <>
          <Typography sx={{ mb: 1 }}>
            <strong>Friend state: </strong> {friendState}
          </Typography>
          {friendState === "You both are not friends" ||
          friendState === "This user is following you" ? (
            <Button
              variant="contained"
              color="info"
              onClick={handleClickFollow}
              sx={{ marginRight: "10px", marginBottom: "10px" }}
            >
              Follow
            </Button>
          ) : (
            <Button
              variant="contained"
              color="error"
              onClick={handleClickUnfollow}
              sx={{ marginRight: "10px", marginBottom: "10px" }}
            >
              Unfollow
            </Button>
          )}
        </>
      ) : (
        <Button
          variant="contained"
          onClick={() => navigate(`/users/${user._id}/friends`)}
          sx={{ marginRight: "10px", marginBottom: "10px" }}
        >
          View all friends
        </Button>
      )}
      <br />
      <Button
        variant="contained"
        onClick={() => navigate(`/users/${user._id}/photos`)}
        sx={{ marginRight: "10px", marginBottom: "10px" }}
      >
        View all photos
      </Button>
      <br />
      <Button
        variant="contained"
        onClick={() => navigate(`/users/${user._id}/comments`)}
        sx={{ marginRight: "10px", marginBottom: "10px" }}
      >
        View all comments
      </Button>
      <br />
      <Button
        variant="contained"
        onClick={() => navigate(`/users/${user._id}/blogs`)}
        sx={{ marginRight: "10px", marginBottom: "10px" }}
      >
        View all blogs
      </Button>
      <br />
    </div>
  );
}

export default UserDetail;
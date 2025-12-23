import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";

import "./styles.css";
import { Link } from "react-router-dom";

function UserList() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [users, setUsers] = useState([]);
  const [countPhotos, setCountPhotos] = useState({});
  const [countComments, setCountComments] = useState({});

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`${API_URL}/api/user/list`);
      const data = await res.json();
      setUsers(data);
    };

    const fetchStats = async () => {
      const res= await fetch(`${API_URL}/api/user/stats`);
      const data = await res.json();
      setCountPhotos(data.count_photos);
      setCountComments(data.count_comments);
    };

    fetchUsers();
    fetchStats();
  }, [API_URL]);

  return (
    <div>
      <List component="nav">
        {users.map((user) => (
          <div key={user._id}>
            <ListItemButton component={Link} to={`/users/${user._id}`}>
              <ListItemText
                primary={`${user.first_name} ${user.last_name}`}
                secondary={`${countPhotos[user._id] || 0} photos, ${countComments[user._id] || 0} comments`}
              />
            </ListItemButton>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
}

export default UserList;

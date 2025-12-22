import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import "./styles.css";
import { Link } from "react-router-dom";

function UserList() {
  const API_URL = process.env.REACT_APP_API_URL;

  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${API_URL}/api/user/list`);
      const data = await res.json();
      setUsers(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      <List component="nav">
        {users.map((user) => (
          <div key={user._id}>
            <ListItemButton component={Link} to={`/users/${user._id}`}>
              <ListItemText
                primary={`${user.first_name} ${user.last_name}`}
                secondary={`${user.photo_count || 0} photos, ${user.comment_count || 0} comments`}
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

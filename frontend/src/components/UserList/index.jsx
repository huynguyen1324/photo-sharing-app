import React, { useEffect, useState } from "react";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

import "./styles.css";

function UserList () {
    const [users, setUsers] = useState([]);

    useEffect(() => {
      const fetchData = async () => {
        const res = await fetch(`http://localhost:8081/api/user/list`);
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
              <ListItemButton href={`/users/${user._id}`}>
                      <ListItemText primary={user.first_name}/>
              </ListItemButton>
              <Divider />
            </div>
          ))}
        </List>
      </div>
    );
}

export default UserList;

import './App.css';

import React from "react";
import { Grid, Typography, Paper } from "@mui/material";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import TopBar from "./components/TopBar";
import UserDetail from "./components/UserDetail";
import UserList from "./components/UserList";
import UserPhotos from "./components/UserPhotos";
import { useState } from 'react';
import Login from './components/Login';

const App = (props) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));

  return (
    <Router>
      <div>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TopBar user={user} setUser={setUser} />
            <div className="main-topbar-buffer" />
          </Grid>
          {user ? (
            <>
              <Grid item sm={3}>
                <Paper className="main-grid-item">
                  <UserList />
                </Paper>
              </Grid>
              <Grid item sm={9}>
                <Paper className="main-grid-item">
                  <Routes>
                    <Route
                      path="/users/:userId"
                      element={<UserDetail />}
                    />
                    <Route
                      path="/photos/:userId"
                      element={<UserPhotos />}
                    />
                  </Routes>
                </Paper>
              </Grid>
            </>
          ) : (
            <Grid item sm={12}>
              <Paper className="main-grid-item">
                <Routes>
                  <Route
                    path="/login"
                    element={<Login setUser={setUser} />}
                  />
                </Routes>
              </Paper>
            </Grid>
          )}
        </Grid>
      </div>
    </Router>
  );
}

export default App;

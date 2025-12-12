import React, { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import "./styles.css";
import { useParams } from "react-router-dom";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const { userId } = useParams();

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`http://localhost:8081/api/photo/${userId}`);
      const data = await res.json();
      setPhotos(data);
    }
    fetchData();
  }, [userId]);

  return (
    <div>
      <Typography variant="h4">User Photos</Typography>
      {photos.map((photo) => (
        <div>
          <img src={`/images/${photo.file_name}`} className="image" alt="" />
          <hr />
        </div>
      ))}
    </div>
  );
}

export default UserPhotos;

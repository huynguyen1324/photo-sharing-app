import React, { useEffect, useState } from "react";
import { Link, Typography } from "@mui/material";
import "./styles.css";
import { useParams } from "react-router-dom";

/**
 * Define UserPhotos, a React component of Project 4.
 */
function UserPhotos() {
  const { userId } = useParams();

  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res_photos = await fetch(`http://localhost:8081/api/photo/${userId}`);
      const data_photos = await res_photos.json();
      setPhotos(data_photos);

      const res_user = await fetch(`http://localhost:8081/api/user/${userId}`);
      const data_user = await res_user.json();
      setUser(data_user);
    }
    fetchData();
  }, [userId]);

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="h5">{user.first_name} {user.last_name}'s Photos</Typography>
      <br />
      {photos.map((photo) => (
        <div>
          <hr />
          <img src={`/images/${photo.file_name}`} className="image" alt="" />
          <br />
          {photo.comments.map((comment) => (
            <div>
              <Link href={`/users/${comment.user._id}`}>
                <strong>{comment.user.first_name} {comment.user.last_name}:</strong>
              </Link>
              <Typography>{comment.comment}</Typography>

              <Typography variant="caption">
                {new Date(comment.date_time).toLocaleString()}
              </Typography>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default UserPhotos;

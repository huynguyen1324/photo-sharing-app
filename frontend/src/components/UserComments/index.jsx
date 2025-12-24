import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function UserComments() {
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const { userId } = useParams();

  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`${API_URL}/api/photo/list`);
      const data = await res.json();
      setPhotos(data);
    };
    fetchData();
  }, [userId, API_URL]);

  return (
    <div>
      {photos.map((photo) =>
        photo.comments.map(
          (comment) =>
            comment.user._id === userId && (
              <Box onClick={() => navigate(`/photos/${photo._id}`)} sx={{ cursor: "pointer", border: "1px solid #ccc", marginBottom: "10px", padding: "10px" }}>
                <div key={comment._id}>
                  <Link to={`/users/${userId}`} style={{ cursor: "pointer" }}>
                    <strong>
                      {comment.user.first_name} {comment.user.last_name}:
                    </strong>
                  </Link>
                  <Typography>{comment.comment}</Typography>
                  <Typography variant="caption" sx={{ flexGrow: 1 }}>
                    {new Date(comment.date_time).toLocaleString()}
                  </Typography>
                </div>
                <img
                  src={`${API_URL}/images/${photo.file_name}`}
                  alt=""
                  style={{ maxWidth: "30vw", maxHeight: "30vh"}}
                />
              </Box>
            )
        )
      )}
    </div>
  );
}

export default UserComments;

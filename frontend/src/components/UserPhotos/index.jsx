import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import "./styles.css";

function UserPhotos({ loggedInUser }) {
  const API_URL = process.env.REACT_APP_API_URL;
  const { userId } = useParams();

  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const res_user = await fetch(`${API_URL}/api/user/${userId}`);
      const data_user = await res_user.json();
      setUser(data_user);

      const res_photos = await fetch(`${API_URL}/api/user/${userId}/photos`);
      const data_photos = await res_photos.json();
      setPhotos(data_photos);
    };
    fetchData();
  }, [userId, API_URL]);

  const handleClickLikePhoto = async (photo) => {
    const isLiked = photo.likes?.some(like => like.user_id === loggedInUser._id);
    const newLikes = isLiked
      ? photo.likes.filter(like => like.user_id !== loggedInUser._id)
      : [...(photo.likes || []), { user_id: loggedInUser._id }];

    setPhotos(photos.map(p =>
      p._id === photo._id ? { ...p, likes: newLikes } : p
    ));

    const res = await fetch(`${API_URL}/api/photo/${photo._id}/like`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId: user._id })
    });

    if (res.status === 200) {
      const updatedPhoto = await res.json();
      setPhotos(photos.map(p => p._id === updatedPhoto._id ? updatedPhoto : p));
    } else {
      setPhotos(photos.map(p =>
        p._id === photo._id ? photo : p
      ));
      alert("Error liking photo");
    }
  }

  const handleDeletePhoto = async (photo) => {
    if (window.confirm("Are you sure to delete this photo?")) {
      const res = await fetch(`${API_URL}/api/photo/${photo._id}`, {
        method: "DELETE",
      })
      if (res.ok) {
        setPhotos(photos.filter(p => p._id !== photo._id));
      } else {
        alert("Error deleting photo.")
      }
    }
  }

  const handleDeleteComment = async (photo, comment) => {
    if (window.confirm("Are you sure to delete this comment?")) {
      const res = await fetch(`${API_URL}/api/photo/${photo._id}/comment`, {
        method: "DELETE",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ comment })
      })
      if (res.status === 200) {
        const data = await res.json();
        setPhotos(photos.map(p => p._id === data._id ? data : p));
      } else {
        alert("Error deleting comment.");
      }
    }
  }

  const handleComment = async (e, photo) => {
    e.preventDefault();
    if (!comment.trim()) {
      alert("Comment cannot be empty");
      return;
    }
    const res = await fetch(`${API_URL}/api/photo/${photo._id}/comment`, {
      method: "POST",
      headers: {
        "Accept": "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ comment, user: loggedInUser })
    });
    if (res.status === 200) {
      const updatedPhoto = await res.json();
      setPhotos(photos.map(p => p._id === updatedPhoto._id ? updatedPhoto : p));
      setComment("");
    } else {
      alert("Error adding comment");
    }
  }

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div>
      <Typography variant="h5">
        Photos of {user.first_name} {user.last_name}
      </Typography>
      <br />
      <div sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        {photos.map((photo) => {
          const isLiked = photo.likes?.some(like => like.user_id === user._id);
          const likeCount = photo.likes?.length || 0;

          return (
            <Paper key={photo._id} sx={{ maxWidth: "800px", margin: "20px auto", padding: "20px" }}>
              <img src={`${API_URL}/images/${photo.file_name}`} className="photo-detail" alt="" />
              <br />
              <hr />
              <Box sx={{ display: "flex", gap: 1, justifyContent: "space-between", alignItems: "center" }}>
                <Button
                  onClick={() => handleClickLikePhoto(photo)}
                  startIcon={isLiked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                >
                  <Typography>{likeCount}</Typography>
                </Button>
                {(photo.user_id === loggedInUser._id || loggedInUser.role === "Admin") && (
                  <Button variant="contained" color="error" onClick={() => handleDeletePhoto(photo)} sx={{ marginBlock: "10px" }}>DELETE PHOTO</Button>
                )}
              </Box>

              <hr />
              {photo.comments.map((comment) => (
                <div key={comment._id}>
                  <Link to={`/users/${comment.user._id}`} style={{ cursor: "pointer" }}>
                    <strong>{comment.user.first_name} {comment.user.last_name}:</strong>
                  </Link>
                  <br />
                  <Typography variant="caption" sx={{ marginRight: "10px" }}>
                    {new Date(comment.date_time).toLocaleString()}
                  </Typography>
                  <Typography>{comment.comment}</Typography>
                  {(comment.user._id === loggedInUser._id || loggedInUser.role === "Admin") && (
                    <Button variant="outlined" color="error" onClick={() => handleDeleteComment(photo, comment)}>Delete comment</Button>
                  )}
                  <hr />
                </div>
              ))}

              <Box
                component="form"
                onSubmit={(e) => handleComment(e, photo)}
                sx={{ display: "flex", gap: 1, alignItems: "center" }}
              >
                <TextField
                  label="Comment"
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  fullWidth
                  sx={{ marginBlock: "10px" }}
                />
                <Button variant="contained" size="small" type="submit">Add Comment</Button>
              </Box>
            </Paper>
          );
        })}
      </div>
    </div>
  );
}

export default UserPhotos;
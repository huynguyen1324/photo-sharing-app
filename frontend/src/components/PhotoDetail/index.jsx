import "./styles.css";
import { useEffect, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate, useParams } from "react-router-dom";

function PhotoDetail({ user }) {
    const API_URL = process.env.REACT_APP_API_URL;
    const navigate = useNavigate();

    const { photoId } = useParams();
    const [photo, setPhoto] = useState(null);
    const [comment, setComment] = useState("");

    useEffect(() => {
        const fetchPhoto = async () => {
            const res = await fetch(`${API_URL}/api/photo/` + photoId);
            const data = await res.json();
            setPhoto(data);
        }
        fetchPhoto();
    }, [photoId, API_URL]);

    if (!photo) {
        return <Typography>Loading...</Typography>;
    }

    const handleComment = async (e) => {
        e.preventDefault();
        if (!comment.trim()) {
            alert("Comment cannot be empty");
            return;
        }
        const res = await fetch(`${API_URL}/api/photo/` + photoId + `/comment`, {
            method: "post",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ comment, user })
        });
        if (res.status === 200) {
            const updatedPhoto = await res.json();
            setPhoto(updatedPhoto);
            setComment("");
        } else {
            alert("Error adding comment");
        }
    }

    const handleDeletePhoto = async () => {
        if (window.confirm("Are you sure to delete this photo?")) {
            const res = await fetch(`${API_URL}/api/photo/${photoId}`, {
                method: "DELETE",
            })
            if(res.ok) {

                navigate(`/users/${user._id}`);
            } else {
                alert("Error deleting photo.")
            }
        }
    }


    const handleDeleteComment = async (comment) => {
        if (window.confirm("Are you sure to delete this comment?")) {
            const res = await fetch(`${API_URL}/api/photo/` + photoId + `/comment`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ comment })
            })
            if (res.status === 200) {
                const data = await res.json();
                setPhoto(data);
            } else {
                alert("Error deleting comment.");
            }
        }
    }

    return (
        <div>
            <img src={`${API_URL}/images/${photo.file_name}`} className="photo-detail" alt="" />
            {photo.user_id === user._id && (
                <Button variant="contained" color="error" onClick={handleDeletePhoto} sx={{marginBlock: "10px"}}>DELETE PHOTO</Button>
            )}
            <hr />
            <Typography variant="h5">COMMENTS</Typography>
            {photo.comments.map((comment) => (
                <div key={comment._id}>
                    <Link to={`/users/${comment.user._id}`} style={{ cursor: "pointer" }}>
                        <strong>{comment.user.first_name} {comment.user.last_name}:</strong>
                    </Link>
                    <Typography>{comment.comment}</Typography>
                    <Typography variant="caption" sx={{ marginRight: "10px" }}>
                        {new Date(comment.date_time).toLocaleString()}
                    </Typography>
                    {comment.user._id === user._id && (
                        <Button color="error" onClick={() => handleDeleteComment(comment)}>Delete comment</Button>
                    )}
                </div>
            ))}
            <hr />
            <Box component="form" onSubmit={handleComment}>
                <TextField
                    label="Comment"
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    fullWidth
                    sx={{ marginBlock: "10px" }}
                />
                <Button variant="contained" type="submit">Add comment</Button>
            </Box>
        </div>
    );
}

export default PhotoDetail;


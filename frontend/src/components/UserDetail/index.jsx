import { useState, useEffect, useRef } from "react";
import { Typography, Button } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import "./styles.css";

function UserDetail({ signedInUser }) {
  const { userId } = useParams();
  const navigate = useNavigate();

  const [photos, setPhotos] = useState([]);
  const [user, setUser] = useState(null);

  const fileInputRef = useRef(null);

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

  const handleClickPhoto = (photo) => {
    navigate(`/photos/${photo._id}`);
  }

  const handleClickUpload = () => {
    fileInputRef.current.click();
  }

  const handleUploadPhoto = async (event) => {
    const file = event.target.files[0];
    const fileName = file.name;

    if (file) {
      const res = await fetch(`http://localhost:8081/api/photo/${userId}/upload`, {
        method: "post",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userId, fileName })
      })
      if (res.status === 200) {
        alert("Upload photo successfully!");

        window.location.reload();
      } else {
        alert("Error uploading photo");
      }
    }
  }

  if (!user) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <div className="user-detail">
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
      {/* <Button variant="contained" href={`/photos/${userId}`}>
          View Photos
        </Button> */}
      <br />
      <div className="image-grid">
        {photos.map((photo) => (
          <div className="image-box" key={photo._id} onClick={() => handleClickPhoto(photo)}>
            <img src={`/images/${photo.file_name}`} className="image" alt="" />
          </div>
        ))}
      </div>
      <br />
      {signedInUser && signedInUser._id === userId && (
        <div>
          <Button variant="contained" onClick={handleClickUpload}>Upload photo</Button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleUploadPhoto}
          />
        </div>
      )}
    </div>
  )
}

export default UserDetail;

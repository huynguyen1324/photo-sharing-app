import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function UserPhotos() {
const API_URL = process.env.REACT_APP_API_URL;
const { userId } = useParams();
const navigate = useNavigate();

const [photos, setPhotos] = useState([]);
const [user, setUser] = useState(null);

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

const handleClickPhoto = (photo) => {
  navigate(`/photos/${photo._id}`);
};

if (!user) {
  return <Typography>Loading...</Typography>;
}

return (
  <div>
    <Typography variant="h5">
      Photos of {user.first_name} {user.last_name}
    </Typography>
    <br />
    <div className="image-grid">
      {photos.map((photo) => (
        <div
          className="image-box"
          key={photo._id}
          onClick={() => handleClickPhoto(photo)}
        >
          <img
            className="image"
            src={`${API_URL}/images/${photo.file_name}`}
            alt=""
          />
        </div>
      ))}
    </div>
  </div>
);
}

export default UserPhotos;
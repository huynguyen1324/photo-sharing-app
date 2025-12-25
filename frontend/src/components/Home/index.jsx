import { Paper, Typography } from "@mui/material";
import "./styles.css"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Home({ user }) {
    const API_URL = process.env.REACT_APP_API_URL;
    const [photos, setPhotos] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const res = await fetch(`${API_URL}/api/photo/list`);
            const data = await res.json();
            setPhotos(data);
        };
        fetchData();
    }, [API_URL]);

    const handleClickPhoto = (photo) => {
        navigate(`/photos/${photo._id}`);
    }

    return (
        <>
            <Paper sx={{ width: "100", padding: "30px" }}>
                <Typography variant="h4">Welcome {user.first_name} {user.last_name} to Photo Sharing App!</Typography>
                <br />
                <Typography variant="h6">Let's start exploring. Do you want to upload a photo?</Typography>
            </Paper>
            {/* <br />
            {photos.map((photo) => (
                <div className="image-box" key={photo._id} onClick={() => handleClickPhoto(photo)}>
                    <img src={`${API_URL}/images/${photo.file_name}`} className="image" alt="" />
                </div>
            ))} */}
        </>
    )
}

export default Home;
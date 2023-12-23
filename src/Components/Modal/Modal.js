// Modal.js
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import "./Modal.css"
import { Button } from "@mui/material";
import YouTubeIcon from '@mui/icons-material/YouTube';
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "#000",
  boxShadow: 24,
  p: 4,
};

const baseImageUrl = "https://image.tmdb.org/t/p/w500";

const Modals = ({ isOpen, onClose, Item }) => {
    const [video, setVideo] = useState();
    const fetchVideo = async () => {
      try {
          if (Item && Item[5] && Item[0]) {
              const { data } = await axios.get(
                  `https://api.themoviedb.org/3/${Item[5]}/${Item[0]}/videos?api_key=c8c010423eb7251fc6442dd8535a73e0&language=en-US`
              );
  
              setVideo(data.results[0]?.key);
          }
      } catch (error) {
          console.error("Error fetching video:", error.message);
          // Handle the error accordingly (e.g., show a message to the user)
      }
  };
  
      useEffect(() => {
        fetchVideo();
        console.log(Item)
        // eslint-disable-next-line
      }, [Item]);
      const placeholderImage = 'https://media.istockphoto.com/id/1007557230/photo/movie-projector-on-dark-background.jpg?s=1024x1024&w=is&k=20&c=0cMSe-iphQA4VPhY8mNUz26xvdt7bRTH_hNt_znx9M0=';

     
  return (
    <div className="modal-container">
    
      <Modal
        open={isOpen}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
           {Item && (
            <div className="modal" key={Item[0]} >
              
             <div className="two">
             <h3 className="modal_title">{Item[3] || Item[4]}</h3>
                <p className="overview">{Item[6]}</p>
                  <div className="details">  <p className="release-date">Date : {Item[4] || Item[5]}</p>
                <p className="media-type">Type : {Item[5]}</p></div>
             </div>
             <div className="one">
              <img
                className="modal-image"
                src={Item[2] ? `${baseImageUrl}${Item[2]}` : `${placeholderImage}`}
                alt={Item[3] || Item[4]}
              />
               {video?<Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    style={{ width: '98%',backgroundColor: 'red'}}
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                WatchDemo
                  </Button>:<Button
                    variant="contained"
                    color={Item[1] > 6 ? "primary" : "secondary"}
                    style={{ width: '98%' }}
                  >
                Rating:{Item[1]}
                  </Button>
            }
               </div>
            </div>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default Modals;

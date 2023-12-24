import React, { useState, useEffect } from "react";
import axios from "axios";
import Modals from "../Modal/Modal";
import { Badge, LinearProgress } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import "./index.css";
import Header from "../Header/Header";
import NavBar from "../Navbar/NavBar";
const Movies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showScroll, setShowScroll] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page

  const baseImageUrl = "https://image.tmdb.org/t/p/w500";
  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  const url = `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_API_KEY}&page=${currentPage}`;
  const placeholderImage = 'https://media.istockphoto.com/id/1007557230/photo/movie-projector-on-dark-background.jpg?s=1024x1024&w=is&k=20&c=0cMSe-iphQA4VPhY8mNUz26xvdt7bRTH_hNt_znx9M0=';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        const moviesData = response.data.results;
        setMovies(moviesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [url, currentPage]);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setShowScroll(true);
    } else {
      setShowScroll(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const openModal = (id) => {
    setSelectedItemId(id);
  };

  return (
    <>
      <Header/>
      <div className="container">
      <h1 className="heading">Movies</h1>
      {loading && (
        <div className="linear-progress-container">
          <LinearProgress className="linear-progress" />
        </div>
      )}
      {!loading && (
        <div className="pagination">
          <Stack
            spacing={2}
            sx={{
              zIndex: "101"
            }}
          >
            <Pagination
              count={500}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              style={{ color: 'grey'}}
            />
          </Stack>
        </div>
      )}
      <>
        
        <div className="card-container">
        {movies.map((item) => (
          <div
            className="card"
            key={item.id}
            onClick={() =>
              openModal([
                item.id,
                item.vote_average,
                item.poster_path,
                item.title || item.name,
                item.first_air_date || item.release_date,
                "Movie",
                item.overview
              ])
            }
          >
            <Badge
              badgeContent={item.vote_average}
              color={item.vote_average > 6 ? "primary" : "secondary"}
            >
              <img
                className="poster-image"
                src={item.poster_path ? `${baseImageUrl}${item.poster_path}` : `${placeholderImage}`}
                alt={item.title || item.name}
              />
            </Badge>
            <h2 className="title">{item.title || item.name}</h2>
            <div className="details-container">
              <p className="release-date">
                {item.first_air_date || item.release_date}
              </p>
              <p className="media-type">Movie</p>
            </div>
          </div>
        ))}
      </div>
      </>
      {showScroll && (
        <div className="scroll-to-top" onClick={scrollToTop}>
          <KeyboardArrowUpIcon />
        </div>
      )}
      <Modals
        isOpen={selectedItemId !== null}
        onClose={() => setSelectedItemId(null)}
        Item={selectedItemId}
      />
    </div>
      <NavBar/>
    </>
  );
};

export default Movies;

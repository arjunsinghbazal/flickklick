import React, { useState, useEffect } from "react";
import axios from "axios";
import { Badge, LinearProgress } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Modals from "../Modal/Modal";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import "./index.css";
import Header from "../Header/Header";
import NavBar from "../Navbar/NavBar";

const Upcoming = () => {
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page

  const url = "https://api.themoviedb.org/3/movie/upcoming?api_key=c8c010423eb7251fc6442dd8535a73e0";
  const baseImageUrl = "https://image.tmdb.org/t/p/w500";
  const placeholderImage = 'https://media.istockphoto.com/id/1007557230/photo/movie-projector-on-dark-background.jpg?s=1024x1024&w=is&k=20&c=0cMSe-iphQA4VPhY8mNUz26xvdt7bRTH_hNt_znx9M0=';

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}&page=${currentPage}`);
        const upcomingMoviesData = response.data.results;
        setUpcomingMovies(upcomingMoviesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [url, currentPage]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setShowScrollToTop(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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
      <h1 className="heading">Upcoming Movies and TV Shows</h1>
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
              count={25} // Assuming you know the total number of pages
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              style={{ color: "grey" }}
              showFirstButton
              showLastButton
            />
          </Stack>
        </div>
      )}
      <div className="card-container">
        {upcomingMovies.map((item) => (
          <div
            className="card"
            onClick={() =>
              openModal([
                item.id,
                item.vote_average.toFixed(1),
                item.poster_path,
                item.title || item.name,
                item.first_air_date || item.release_date,
                "Movie/Tv",
                item.overview
              ])
            }
            key={item.id}
          >
            <Badge
              badgeContent={item.vote_average.toFixed(1)}
              color={item.vote_average > 6 ? "primary" : "secondary"}
            >
              <img
                className="poster-image"
                src={item.poster_path ? `${baseImageUrl}${item.poster_path}` : `${placeholderImage}`}
                alt={item.title || item.name}
              />
            </Badge>
            <h2 className="title">{item.title || item.name}</h2>
            <p className="release-date">
              Release: {item.first_air_date || item.release_date}
            </p>
          </div>
        ))}
      </div>
      {showScrollToTop && (
        <div className="scroll-to-top" onClick={scrollToTop}>
          <ArrowUpwardIcon />
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

export default Upcoming;

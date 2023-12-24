import React, { useState, useEffect } from "react";
import axios from "axios";
import { Badge, LinearProgress } from "@mui/material";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import Modals from "../Modal/Modal";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import InputBase from "@mui/material/InputBase";
import "./index.css";
import imaged from "../pic/—Pngtree—not found_5408094.png"
import NavBar from "../Navbar/NavBar";
import Header from "../Header/Header";
const Trending = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [searchQuery, setSearchQuery] = useState(""); // Track the search query
  const [totalPages, setTotalPages] = useState(500);
  const baseImageUrl = "https://image.tmdb.org/t/p/w500";
  const placeholderImage =
    "https://media.istockphoto.com/id/1007557230/photo/movie-projector-on-dark-background.jpg?s=1024x1024&w=is&k=20&c=0cMSe-iphQA4VPhY8mNUz26xvdt7bRTH_hNt_znx9M0=";

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };
  const url="c8c010423eb7251fc6442dd8535a73e0";
  useEffect(() => {
    const fetchData = async () => {
      try {
        let response;
        if (searchQuery) {
          response = await axios.get(
            `https://api.themoviedb.org/3/search/multi?api_key=${url}&query=${searchQuery}&page=${currentPage}`
          );
        } else {
          response = await axios.get(
            `https://api.themoviedb.org/3/trending/all/week?api_key=${url}&page=${currentPage}`
          );
        }

        setData(response.data.results);
        setTotalPages(response.data.total_pages);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [searchQuery, currentPage]);

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

  const handleSearch = () => {
    // Trigger a new search when the search query is updated
    setCurrentPage(1);
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
      <div className="search-container">
        <InputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          style={{ width: '100%' }}
        />
      </div>

      {loading && (
        <div className="linear-progress-container">
          <LinearProgress className="linear-progress" />
        </div>
      )}

      {!loading && data.length === 0 && (
        <div className="not-found-message">
        <img src={imaged} alt="no data found"  />

        </div>
      )}

      {!loading && data.length > 0 && totalPages > 1 && (
        <div className="pagination">
          <Stack
            spacing={2}
            sx={{
              zIndex: "101",
            }}
          >
            <Pagination
              count={100}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              style={{ color: "grey" }}
            />
          </Stack>
        </div>
      )}

      {!loading && data.length > 0 && (
        <div className="card-container">
          {data.map((item) => (
            <div
              className="card"
              onClick={() =>
                openModal([
                  item.id,
                  item.vote_average.toFixed(1),
                  item.poster_path,
                  item.title || item.name,
                  item.first_air_date || item.release_date,
                  item.media_type,
                  item.overview,
                ])
              }
              key={item.id}
            >
              <Badge
                badgeContent={item.vote_average ? item.vote_average.toFixed(1) : '5'}
                color={item.vote_average > 6 ? "primary" : "secondary"}
              >
                <img
                  className="poster-image"
                  src={
                    item.poster_path
                      ? `${baseImageUrl}${item.poster_path}`
                      : `${placeholderImage}`
                  }
                  alt={item.title || item.name}
                />
              </Badge>
              <h2 className="title">{item.title || item.name}</h2>
              <div className="details-container">
                <p className="release-date">
                  {item.first_air_date || item.release_date}
                </p>
                <p className="media-type">{item.media_type}</p>
              </div>
            </div>
          ))}
        </div>
      )}

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

export default Trending;

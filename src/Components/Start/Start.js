import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Start.css";
import { useNavigate } from "react-router-dom";
const Start = () => {
  const Url="c8c010423eb7251fc6442dd8535a73e0";
 const [data,setdata]=useState([])
const navigate=useNavigate();
  useEffect(() => {
    const fetchTrendingPosters = async () => {
      try {
       const response = await axios.get(
            `https://api.themoviedb.org/3/trending/all/week?api_key=${Url}`
          );
     setdata(response.data.results);
      } catch (error) {
        console.error("Error fetching trending posters:", error);
      }
    };

    fetchTrendingPosters();
  }, []);
  return (
    <div className="start">
      <div className="left_landing">
      <h1>flic<span>kk</span>lick</h1>
        <div className="des">
          "Discover the world of <span>movies</span> and <span>series</span> with our curated selection
          of <span>trending</span>, upcoming, and popular titles. Explore detailed
          information, <span>ratings</span>, and even watch demo <span>videos</span>. Your go-to
          destination for the latest in entertainment – because every movie
          deserves a spotlight!"
        </div>
        <button class="button" onClick={()=>navigate("/popular")}>lets go</button>
      </div>
      <div className="right">
  {data.map((item) => (
    <img key={item.id} src={`https://image.tmdb.org/t/p/w500${item.poster_path}`} alt={item.title} />

  ))}
</div>

    </div>
  );
};

export default Start;

import React from "react";
import "../../App.css";
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import { useNavigate } from "react-router-dom";
import UpdateIcon from '@mui/icons-material/Update';

export default function NavBar() {
  const [value, setValue] = React.useState('Trending');
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleData = (newValue) => {
    navigate(newValue);
  };

  const labelStyle = {
    color: '#778899', // Grey color code
  };

  return (
    <div className="navbar">
      <BottomNavigation showLabels value={value} onChange={(event, newValue) => handleChange(event,newValue)}>
        <BottomNavigationAction
          label="Popular"
          value="Trending"
          icon={<TrendingUpIcon />}
          style={{ label: labelStyle }}
          onClick={() => handleData("/popular")}
        />
        <BottomNavigationAction
          label="Movies"
          value="Movies"
          icon={<MovieIcon />}
          style={{ label: labelStyle }}
          onClick={() => handleData("/movies")}
        />
        <BottomNavigationAction
          label="Series"
          value="Series"
          icon={<TvIcon />}
          style={{ label: labelStyle }}
          onClick={() => handleData("/series")}
        />
        <BottomNavigationAction
          label="Upcoming"
          value="Upcoming"
          icon={<UpdateIcon />}
          style={{ label: labelStyle }}
          onClick={() => handleData("/upcoming")}
        />
      </BottomNavigation>
    </div>
  );
}

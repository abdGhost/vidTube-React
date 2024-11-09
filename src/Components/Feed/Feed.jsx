import React, { useEffect, useState } from "react";
import "./Feed.css";
import axios from "axios";
import moment from "moment/moment";

import { Link } from "react-router-dom";

const Feed = ({ category }) => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    const videoList_url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&regionCode=US&maxResults=50&videoCategoryId=${category}&key=${
      import.meta.env.VITE_YOUTUBE_API_KEY
    }`;

    try {
      const response = await axios.get(videoList_url);
      console.log(response.data.items);
      setData(response.data.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  const formatViews = (views) => {
    if (views >= 1e9) return (views / 1e9).toFixed(1) + "B";
    if (views >= 1e6) return (views / 1e6).toFixed(1) + "M";
    if (views >= 1e3) return (views / 1e3).toFixed(1) + "K";
    return views;
  };

  const timeAgo = (date) => {
    return moment(date).fromNow();
  };

  return (
    <div className="feed">
      {data.map((item, index) => {
        return (
          <Link
            to={`video/${item.snippet.categoryId}/${item.id}`}
            className="card"
            key={index}
          >
            <img src={item.snippet.thumbnails.medium.url} alt="" />
            <h2>{item.snippet.title}</h2>
            <h3>{item.snippet.channelTitle}</h3>

            <p>
              {formatViews(item.statistics.viewCount)} views &bull;{" "}
              {timeAgo(item.snippet.publishedAt)}
            </p>
          </Link>
        );
      })}
    </div>
  );
};

export default Feed;

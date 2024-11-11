import React, { useEffect, useState } from "react";
import "./PlayVideo.css";

import axios from "axios";

import video1 from "../../assets/video.mp4";
import like from "../../assets/like.png";
import dislike from "../../assets/dislike.png";
import share from "../../assets/share.png";
import save from "../../assets/save.png";
import jack from "../../assets/jack.png";
import user_profile from "../../assets/user_profile.jpg";
import moment from "moment";

const PlayVideo = ({ videoId, catgoryId }) => {
  const [videoDetails, setVideoDetails] = useState(null);

  // youtube video 2:11
  const fetchVideoDetails = async (videoId) => {
    const API_KEY = `${import.meta.env.VITE_YOUTUBE_API_KEY}`;
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${API_KEY}`;
    try {
      const response = await axios.get(url);

      setVideoDetails(response.data.items[0]);
      console.log(videoDetails);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (videoId) {
      fetchVideoDetails(videoId);
    }
  }, [videoId]);

  return (
    <div className="play-video">
      {/* <video src={video1} controls autoPlay muted></video> */}
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      {/* <h3>{videoDetails.snippet.title}</h3> */}
      <div className="play-video-info">
        <p>
          {videoDetails.statistics.viewCount} &bull;
          {/* {moment(videoDetails.snippet.publishedAt).fromNow()}days ago */}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            125
          </span>
          <span>
            <img src={dislike} alt="" />2
          </span>
          <span>
            <img src={share} alt="" />
            Share
          </span>
          <span>
            <img src={save} alt="" />
            Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={jack} alt="" />
        <div>
          <p>GreatStack</p>
          <span>1M Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="video-description">
        <p>Channel that makes learning Easy</p>
        <p>SubscribeGreatStack to watch More on Web Development</p>
        <hr />
        <h4>130 Comments</h4>
        <div className="comment">
          <img src={user_profile} alt="" />
          <div>
            <h3>
              Jack Nicholson <span>1 day ago</span>
            </h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse
              facilis aliquid eligendi aperiam tempora, architecto atque omnis
              non adipisci ea.
            </p>
            <div className="comment-action">
              <img src={like} alt="" />
              <span>244</span>
              <img src={dislike} alt="" />
            </div>
          </div>
        </div>
        <div className="comment">
          <img src={user_profile} alt="" />
          <div>
            <h3>
              Jack Nicholson <span>1 day ago</span>
            </h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse
              facilis aliquid eligendi aperiam tempora, architecto atque omnis
              non adipisci ea.
            </p>
            <div className="comment-action">
              <img src={like} alt="" />
              <span>244</span>
              <img src={dislike} alt="" />
            </div>
          </div>
        </div>
        <div className="comment">
          <img src={user_profile} alt="" />
          <div>
            <h3>
              Jack Nicholson <span>1 day ago</span>
            </h3>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Esse
              facilis aliquid eligendi aperiam tempora, architecto atque omnis
              non adipisci ea.
            </p>
            <div className="comment-action">
              <img src={like} alt="" />
              <span>244</span>
              <img src={dislike} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayVideo;

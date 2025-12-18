import { useState } from "react";
import listVideos from "./listVideos";
import "./style.css";


export default function App() {
  const [videos, setVideos] = useState(listVideos);

  function toggleLike(id) {
    setVideos((prev) =>
      prev.map((v) =>
        v.id === id
          ? { ...v, liked: !v.liked, likes: v.likes + (v.liked ? -1 : 1) }
          : v
      )
    );
  }

  function inc(id, field) {
    setVideos((prev) =>
      prev.map((v) => (v.id === id ? { ...v, [field]: v[field] + 1 } : v))
    );
  }

  return (
    <div className="app">
      <h2 className="title">Videos Likes</h2>

      {videos.map((v) => (
        <Video
          key={v.id}
          video={v}
          onToggleLike={toggleLike}
          onInc={inc}
        />
      ))}
    </div>
  );
}

function Video({ video, onToggleLike, onInc }) {
  return (
    <div className="card">
      <div className="video">{video.title}</div>

      <div className="caption">{video.caption}</div>
      <div className="description">{video.description}</div>

      <div className="actions">
        <button onClick={() => onToggleLike(video.id)}>
          {video.liked ? "🩶 Descurtir" : "❤️ Curtir"} <span className="count">{video.likes}</span>
        </button>

        <button onClick={() => onInc(video.id, "comments")}>
          💬 Comentar <span className="count">{video.comments}</span>
        </button>

        <button onClick={() => onInc(video.id, "shares")}>
          🔁 Compartilhar <span className="count">{video.shares}</span>
        </button>
      </div>
    </div>
  );
}
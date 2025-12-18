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
        <div className="card" key={v.id}>
          <div className="video">{v.title}</div>

          <div className="caption">{v.caption}</div>
          <div className="description">{v.description}</div>

          <div className="actions">
            <button onClick={() => toggleLike(v.id)}>
              {v.liked ? "🩶 Descurtir" : "❤️ Curtir"} <span className="count">{v.likes}</span>
            </button>

            <button onClick={() => inc(v.id, "comments")}>
              💬 Comentar <span className="count">{v.comments}</span>
            </button>

            <button onClick={() => inc(v.id, "shares")}>
              🔁 Compartilhar <span className="count">{v.shares}</span>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
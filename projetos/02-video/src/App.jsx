import { useState } from "react";
import listVideos from "./listVideos";
import Video from "./Video";
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
          id={v.id}
          caption={v.caption}
          comments={v.comments}
          description={v.description}
        />
      ))}
    </div>
  );
}
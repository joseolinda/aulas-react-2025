function Video({ key, title, caption, description, likes, liked, comments, shares, toggleLike, inc}) {

    return (
        <div className="card" key={key}>
          <div className="video">{title}</div>

          <div className="caption">{caption}</div>
          <div className="description">{description}</div>

          <div className="actions">
            <button onClick={toggleLike}>
              {liked ? "🩶 Descurtir" : "❤️ Curtir"} <span className="count">{likes}</span>
            </button>

            <button onClick={inc}>
              💬 Comentar <span className="count">{comments}</span>
            </button>

            <button onClick={inc}>
              🔁 Compartilhar <span className="count">{shares}</span>
            </button>
          </div>
        </div>
    )
}

export default Video;
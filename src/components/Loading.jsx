import "../css/Loading.css";

function Loading() {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-ring"></div>
        <div className="spinner-icon">🎬</div>
      </div>
      <p className="loading-text">Loading movies...</p>
    </div>
  );
}

export default Loading;

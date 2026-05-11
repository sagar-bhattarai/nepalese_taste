const StarDisplay = ({ rating = 0 }) => {
  const percentage = (rating / 5) * 100;

  return (
    <div style={{ position: "relative", display: "inline-block", fontSize: "24px" }}>
      
      {/* empty stars */}
      <div style={{ color: "#ddd" }}>
        ★★★★★
      </div>

      {/* filled stars */}
      <div
        style={{
          color: "gold",
          position: "absolute",
          top: 0,
          left: 0,
          whiteSpace: "nowrap",
          overflow: "hidden",
          width: `${percentage}%`,
        }}
      >
        ★★★★★
      </div>

    </div>
  );
};

export default StarDisplay;
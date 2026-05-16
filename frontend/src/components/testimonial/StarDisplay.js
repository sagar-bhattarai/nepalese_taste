const StarDisplay = ({ rating = 0, size = "54" }) => {
  const percentage = (rating / 5) * 100;

  return (
    <div 
    className={`relative inline-block text-sm md:text-[28px] leaing-4 md:leading-[20px]`}
    // style={{ position: "relative", display: "inline-block", fontSize: size + "px" , lineHeight: size ? `${(size)}px` : "60px"}}
    >
      
      {/* empty stars */}
      <div style={{ color: "#898989" }}>
        ★★★★★
      </div>

      {/* filled stars */}
      <div
        style={{
          color: "#8200db",
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
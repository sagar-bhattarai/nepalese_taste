"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";

export default function StarInput({
  value = 0,
  onChange,
}) {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          type="button"
          key={star}
          onClick={() => onChange(star)}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
          className="text-2xl transition"
        >
          <FaStar
            className={`cursor-pointer ${
              star <= (hover || value)
                ? "text-primary"
                : "text-gray-500"
            }`}
          />
        </button>
      ))}
    </div>
  );
}
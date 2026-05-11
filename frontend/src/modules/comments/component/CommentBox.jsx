"use client";
import { useState } from "react";


export default function CommentBox({ onSubmit, showReply }) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (!text.trim()) return;
    onSubmit(text);
    setText("");
  };

  return (
    <>
      {showReply
        ?
        <div className="w-full mt-4 flex items-end justify-end gap-2">
          <div className="w-full ml-9 min-h-10 flex ">
            <textarea
              className="w-full min-h-10 h-10 border border-gray-600 rounded-md px-1 py-1"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <button
            className="text-white dark:text-black dark:hover:text-gray-300 hover:animate-pulse bg-primary px-4 py-2 rounded-md hover:bg-purple-900 cursor-pointer"
            onClick={handleSubmit}>
            Reply
          </button>
        </div>
        :
        <div className="mt-4 flex flex-col items-end justify-end w-full">
          <div className="w-full">
            <textarea
              className="w-full h-full border border-gray-600 rounded-md px-2 py-1"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <button
            className="text-white dark:text-black dark:hover:text-gray-300 hover:animate-pulse  bg-primary px-4 py-2 rounded-md hover:bg-purple-900 cursor-pointer"
            onClick={handleSubmit}>
            Post Comment
          </button>
        </div>
      }
    </>
  );
}

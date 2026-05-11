"use client";
import { useState } from "react";
import CommentBox from "./component/CommentBox";
import user_placeholder from "../../../public/user_placeholder.png"
import Image from "next/image";
import { useSelector } from "react-redux";
import { getTimeAgo } from "./utility/getTimeAgo";
import ReactionPicker from "./component/ReactionPicker";

const CommentItem = ({ comment, reactions, addComment, deleteComment, editComment, postReaction, fetchReactions }) => {
  const [showReply, setShowReply] = useState(false);
  const [editing, setEditing] = useState(false);
  const [text, setText] = useState(comment.isDeleted ? "This comment was deleted." : comment.text);
  const { user } = useSelector(state => state.auth);
  const now = useSelector((state) => state.time.now);
  const { time, timeSuffix, timeAgo } = getTimeAgo(comment.createdAt, now);

  return (
    <div style={{ borderLeft: "1px solid #99a1af", paddingLeft: "10px" }} className={`${comment.depth === 0 && "mt-5 bg-[#3a4b6029] p-2"} mb-3 mt-3 rounded-md`}>

      <div className="bg-gray-200 dark:bg-[#18212d] rounded-md p-2">
        <div className="flex items-end gap-1">
          <Image src={comment?.userId?.profileImage ? comment?.userId?.profileImage : user_placeholder} height={10} width={10} alt="user" className="text-[8px] h-5 w-5 rounded-full " />
          <p className="text-[10px] text-gray-500">{comment?.userId?.userName}</p>
        </div>
        {/* TEXT OR EDIT */}
        {editing ? (
          <div className="flex gap-2 my-1">
            <input className="w-full h-full border border-gray-600 rounded-md px-2 py-1" value={text} onChange={(e) => setText(e.target.value)} />
            <button className="text-white dark:text-black dark:hover:text-gray-300 hover:animate-pulse  bg-primary px-4 py-1 rounded-md hover:bg-purple-900 cursor-pointer" onClick={() => {
              editComment(comment._id, text);
              setEditing(false);
            }}>Edit</button>
          </div>
        ) : (
          <p className="text-gray-400 py-1">{text}</p>
        )}

        {/* ACTIONS */}

        <div className="flex gap-2 text-[10px]">

          <div className="relative flex items-center ">
            <ReactionPicker comment={comment} onSelect={(type) => postReaction(comment._id, type)}  />
          </div>

          {(user) &&
            <div className="flex items-center  gap-2 text-[10px]">
              {comment.depth !== 3 &&
                <>
                  { // user cannot reply to self
                    (user.userData?._id != comment?.userId?._id)
                    &&
                    <button
                      onClick={() => setShowReply(!showReply)}
                      className="text-green-700 dark:text-green-300 hover:text-green-500 cursor-pointer">
                      {showReply ? "Cancel" : "Reply"}
                    </button>
                  }
                  { // only user can edit and delete its own comment
                    ((user.userData?._id == comment?.userId?._id) && (comment.isDeleted != true))
                    &&
                    <>
                      { // can edit a comment with in a hour
                        (time < 59 && (timeSuffix == "just now" || timeSuffix == " min ago" || timeSuffix == " mins ago"))
                        &&
                        <button
                          onClick={() => setEditing(!editing)}
                          className="text-amber-700 dark:text-amber-300 hover:text-amber-500  cursor-pointer">
                          {editing ? "Cancel" : "Edit"}
                        </button>
                      }

                      { // can delete a comment with in a half hour
                        ((time < 30) && (timeSuffix == "just now" || timeSuffix == " min ago" || timeSuffix == " mins ago"))
                        &&
                        <button
                          onClick={() => deleteComment(comment._id)}
                          className="text-red-700 dark:text-red-400 hover:text-red-500 cursor-pointer">
                          Delete
                        </button>
                      }
                    </>
                  }

                </>
              }
              <p className="text-gray-500">{timeAgo}</p>
            </div>
          }
        </div>
      </div>


      {/* REPLY BOX */}
      {showReply && (
        <CommentBox
          onSubmit={(text) => {
            addComment(text, comment._id);
            setShowReply(false);
          }}
          showReply={true}
        />
      )}

      {/* CHILDREN (recursive 👇) */}
      {comment.children?.map((child) => (
        <CommentItem
          key={child._id}
          comment={child}
          addComment={addComment}
          deleteComment={deleteComment}
          editComment={editComment}
          postReaction={postReaction} 
          fetchReactions={fetchReactions}
          reactions={reactions}
        />
      ))}
    </div>
  );
};

export default CommentItem;
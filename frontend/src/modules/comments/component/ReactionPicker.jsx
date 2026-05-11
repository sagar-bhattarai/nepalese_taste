"use client";
import { useState } from "react";
import { reactions, reactionMap } from "../utility/constant.js";
import { useSelector } from "react-redux";
import { useReactions } from "../Hooks/useReactions";
import user_placeholder from "../../../../public/user_placeholder.png";

const ReactionPicker = ({ onSelect, comment }) => {

  const [open, setOpen] = useState(false);
  const [banThisPopup, setBanThisPopup] = useState(false);
  const [allReactionsPopup, setAllReactionsPopup] = useState(false);
  const [groupOpen, setGroupOpen] = useState("all");
  const userId = useSelector((state) => state?.auth?.user?.data?.loggedInUser?._id);
  const { userReactions, fetchReactions } = useReactions();

  const userReaction = comment?.reactions?.find(
    (r) => r.user.toString() === userId
  );

  const emoji = reactionMap[userReaction?.type] || "👍";

  const handleOpenReactions = (commentId) => {
    setAllReactionsPopup(!allReactionsPopup);
    fetchReactions(commentId);
  };

  return (
    <div className="relative flex items-center justify-center">

      {/* Smily Icons Band Popup */}
      <>
        <div
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => { setOpen(false); setBanThisPopup(false) }}
        >
          <div className="inline-block relative">
            <div className="px-1 py-1 cursor-pointer rounded">
              <span className="capitalize">{
                (userReaction
                  && (` ${(userReaction?.type == "ban_this") ? "Ban This" : userReaction?.type} ${emoji} `)
                  || "Like 👍")
              }</span>
            </div>


            {open && (
              <div className="absolute bottom-5 left-0 flex gap-2 bg-primary shadow-lg py-1 px-3 rounded-full border border-primary">
                {reactions.map((r) => (
                  <div key={r.type} className="flex flex-col items-center justify-center">
                    <button
                      key={r.type}
                      onClick={() => {
                        onSelect(r.type);
                        setOpen(false);
                      }}
                      onMouseEnter={() => { (r.type == "ban_this") && setBanThisPopup(true) }}
                      onMouseLeave={() => { (r.type == "ban_this") && setBanThisPopup(false) }}
                      className="text-xs hover:scale-125 transition cursor-pointer"
                    >
                      <span className={`${r.type == userReaction?.type && "bg-purple-900 rounded-full p-0.5"}`}>{r.emoji}</span>
                    </button>
                    <p
                      onMouseEnter={() => { (r.type == "ban_this") && setBanThisPopup(true) }}
                      onMouseLeave={() => { (r.type == "ban_this") && setBanThisPopup(false) }}
                      className={`${r.type == userReaction?.type ? "text-black" : "text-white"} text-[8px]  leading-2.5 inline-block text-nowrap cursor-pointer`}>
                      {(r.type == "band_this") ? "ban this" : r.type}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {banThisPopup &&
          <div className="absolute top-[-44px] left-[85px]  w-max text-[8px] text-red-600 leading-2.5 text-nowrap">
            10 counts of this will band/remove this comment
          </div>
        }
      </>


      {/* All Reactions Popup */}
      <>
        {allReactionsPopup && (userReactions?.reactedUsers?.length > 0)
          &&
          (
            <div
              onMouseEnter={() => setAllReactionsPopup(true)}
              onMouseLeave={() => { setAllReactionsPopup(false) }}
              className="absolute bottom-5 left-0 cursor-pointer bg-primary shadow-lg p-3 rounded-md min-w-40 w-max max-h-60 overflow-auto  scrollbar scrollbar-thumb-transparent scrollbar-track-transparent">
              <div className="relative flex flex-col gap-2">

                <div className="sticky  z-10 flex gap-2 bg-primary py-1 -top-3">
                  {/* Reaction type */}
                  <h4
                    onMouseEnter={() => setGroupOpen("all")}
                    className="font-bold cursor-pointer hover:bg-purple-900 py-0.5 px-1 rounded-md">
                    All
                  </h4>
                  {userReactions?.reactedUsers?.map((item, index) => (
                    <div key={index}>
                      <h4
                        onMouseEnter={() => setGroupOpen(item?.type)}
                        className="font-bold cursor-pointer hover:bg-purple-900 py-0.5 px-1 rounded-md">
                        {reactionMap[item?.type]} {item?.type} ({item?.count})
                      </h4>
                    </div>
                  ))}
                </div>

                {/* Users */}
                <div>
                  {userReactions?.reactedUsers?.map((item) => (
                    (groupOpen == 'all')
                      ?
                      <div key={item?.type} className={` ${item?.type} flex flex-col`}>
                        {item?.users?.map((u) => (
                          <div key={u._id} className="flex items-center gap-2 text-sm mb-2">
                            <img
                              src={u.profileImage ? u.profileImage : user_placeholder.src}
                              className="w-6 h-6 rounded-full"
                            />
                            <span className="max-w-52">{u.userName}</span>
                          </div>
                        ))}
                      </div>
                      :
                      (groupOpen == item?.type)
                      &&
                      <div key={item?.type} className="flex flex-col ">
                        {item?.users?.map((u) => (
                          <div key={u._id} className="flex items-center mb-2 gap-2 text-sm">
                            <img
                              src={u?.profileImage ? u?.profileImage : user_placeholder?.src}
                              className="w-6 h-6 rounded-full"
                            />
                            <span className="max-w-52">{u?.userName}</span>
                          </div>
                        ))}
                      </div>
                  ))}

                </div>

              </div>

            </div>
          )
        }
        <span
          onClick={() => { handleOpenReactions(comment?._id) }}
          onMouseEnter={() => { handleOpenReactions(comment?._id) }}
          onMouseLeave={() => { setAllReactionsPopup(false) }}
          className="cursor-pointer px-1">
          {comment?.reactions?.length || 0}
        </span>
      </>

    </div>
  );
};

export default ReactionPicker;
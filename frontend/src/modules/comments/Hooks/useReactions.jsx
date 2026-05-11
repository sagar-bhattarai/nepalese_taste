import { useState, useEffect } from "react";
import { getReactionsById } from "../apis/comment.api";


const groupReactions = (reactions) => {
  const map = {};

  reactions?.forEach((r) => {
    if (!map[r.type]) {
      map[r.type] = {
        type: r.type,
        count: 0,
        users: [],
      };
    }

    map[r.type].count++;
    map[r.type].users.push(r.user);
  });

  return {
    reactedUsers: Object.values(map),
    // groups: Object.keys(map),       
  };
};



export const useReactions = () => {
  const cache = {};
  const [userReactions, setUserReactions] = useState(null);

  const fetchReactions = async (commentId) => {
    if (cache[commentId]) {
      setUserReactions(cache[commentId]);
      return;
    }
    const data = await getReactionsById(commentId);
    const grouped = groupReactions(data);

    cache[commentId] = grouped;
    setUserReactions(grouped);
  };

  return { userReactions, fetchReactions };
};






{/*
  
  export const useReactions = (commentId) => {
  const [userReactions, setUserReactions] = useState(null);

  const fetchReactions = async (id) => {
    const data = await getReactionsById(id || commentId);
    setUserReactions(groupReactions(data));
  };

  useEffect(() => {
      if (commentId) fetchReactions();
    }, [commentId]);

    return { userReactions, fetchReactions };
  };
  
*/}
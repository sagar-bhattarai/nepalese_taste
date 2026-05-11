"use client";
import { useState,useEffect  } from "react";
import { getCommentById, addComment, editComment, deleteComment, addReaction } from "../apis/comment.api";


const buildTree = (comments) => {
  const map = {};
  const roots = [];

  comments.forEach((c) => {
    map[c._id] = { ...c, children: [] };
  });

  comments.forEach((c) => {
    if (c.parentId) {
      map[c.parentId]?.children.push(map[c._id]);
    } else {
      roots.push(map[c._id]);
    }
  });
  return roots;
};


export const useComments = (postId) => {
  const [comments, setComments] = useState([]);

  const postReaction = async (commentId, type) => {
    await addReaction({
      commentId,
      type,
    });
    fetchComments();
  };

  const fetchComments = async () => {
    const data = await getCommentById({ postId }); 
    setComments(buildTree(data));                
  };

  const postComment = async (text, parentId = null) => {
    await addComment({
      postId,
      text,
      parentId,
    });
    fetchComments();
  };

  const removeComment = async (id) => {
    await deleteComment(id);
    fetchComments();
  };

  const updateComment = async (id, text) => {
    await editComment(id, { text });
    fetchComments();
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  return { comments, postComment, removeComment, updateComment, postReaction };
};






"use client"
import CommentBox from "./CommentBox";
import CommentList from "./CommentList";
import { useComments } from "../Hooks/useComments";
import { useReactions } from "../Hooks/useReactions";

const CommentSection = ({ postId }) => {
    const { comments, postComment, removeComment, updateComment, postReaction } = useComments(postId);
    const { reactions, fetchReactions }= useReactions(postId);

    return (
        <>
            <CommentBox onSubmit={(text) => postComment(text)} />
            <CommentList
                comments={comments}
                reactions={reactions}
                addComment={postComment}     
                deleteComment={removeComment} 
                editComment={updateComment}  
                postReaction={postReaction}  
                fetchReactions={fetchReactions}
            />
        </>
    );
};

export default CommentSection




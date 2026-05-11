import CommentItem from "../CommentItem";

const CommentList = ({ comments, ...actions }) => {
  return (
    <div>
      {comments.map((c) => (
        <CommentItem key={c._id} comment={c} {...actions} />
      ))}
    </div>
  );
};

export default CommentList;





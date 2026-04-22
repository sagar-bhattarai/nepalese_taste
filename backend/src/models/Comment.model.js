import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      index: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    parentId: {
      type: mongoose.Schema.Types.ObjectId,
      default: null,
      index: true,
    },
    depth: {
      type: Number,
      default: 0, // helps limit nesting
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    reactions: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        type: {
          type: String,
          enum: ["like", "love", "haha", "wow", "sad", "angry", "disLike", "violence", "ban_this"],
        },
      },
    ],

  },
  { timestamps: true }
);

// export default mongoose.models.Comment ||  mongoose.model("Comment", commentSchema);

const CommentModel = mongoose.model("Comment", commentSchema);
export default CommentModel;

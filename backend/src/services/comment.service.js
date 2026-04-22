import CommentModel from "../models/Comment.model.js";

const add = async (req) => {
    const { postId, text, parentId } = await req.body;
    const userId = req.user._id;

    let depth = 0;

    if (!text || !text.trim()) {
        throw {
            statusFromService: 400,
            msgFromService: "Comment cannot be empty",
        };
    }

    // If it's a reply, calculate depth
    if (parentId) {
        const parent = await CommentModel.findById(parentId);

        if (!parent) {
            throw {
                statusFromService: 404,
                msgFromService: "Parent not found",
            };
        }

        depth = parent.depth + 1;

        // Limit nesting (important)
        if (depth > 3) {
            throw {
                statusFromService: 404,
                msgFromService: "Max depth reached",
            };
        }
    }

    const comment = await CommentModel.create({
        postId,
        userId,
        text,
        parentId: parentId || null,
        depth,
    });

    return comment;
};

const all = async (req) => {
    const postId = req.params.id;

    const comments = await CommentModel.find({ postId })
        .populate("userId", "userName profileImage")
        .sort({ createdAt: -1 })
        .lean();

    return comments;
};

const update = async (req) => {
    const { id } = req.params;
    const { text } = await req.body;
    const userId = req.user._id;

    const comment = await CommentModel.findById(id);

    if (!comment) {
        throw {
            statusFromService: 400,
            msgFromService: "Not found"
        }
    }

    // Ownership check
    if (comment.userId.toString() !== userId.toString()) {
        throw {
            statusFromService: 403,
            msgFromService: "Unauthorized"
        }
    }

    comment.text = text;
    await comment.save();

    return comment;
}

const remove = async (req) => {
    const { id } = req.params;
    const userId = req.user._id;

    const comment = await CommentModel.findById(id);

    if (!comment) {
        throw {
            statusFromService: 400,
            msgFromService: "Not found"
        }
    }

    if (comment.userId.toString() !== userId.toString()) {
        throw {
            statusFromService: 403,
            msgFromService: "Unauthorized"
        }
    }

    comment.isDeleted = true;
    // comment.text = "This comment was deleted";
    await comment.save();

    return ({ deleted: true });

}

const reaction = async (req) => {
  const userId = req.user._id;
  const { type, commentId } = req.body; 

  const comment = await CommentModel.findById(commentId);

  const existing = comment.reactions.find(
    (r) => r.user.toString() === userId.toString()
  );


  if (existing) {
    if (existing.type === type) {
      // same reaction → remove (toggle off)
      comment.reactions = comment.reactions.filter(
        (r) => r.user.toString() !== userId.toString()
      );
    } else {
      // change reaction
      existing.type = type;
    }
  } else {
    // new reaction
    comment.reactions.push({ user: userId, type });
  }

  await comment.save();

  return comment;
};

export default { add, all, update, remove, reaction };

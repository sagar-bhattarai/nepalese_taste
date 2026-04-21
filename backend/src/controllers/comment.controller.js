import commentService from "../services/comment.service.js";
import config from "../configs/config.js";

const getAllComments = async (req, res) => {
  try {
    const result = await commentService.all(req);

    return res
      .status(200)
      .json({ api: config.api, result, message: "Comments fetched successfully." });
  } catch (error) {
    return res
      .status(error.statusFromService || 500)
      .json({ message: error.msgFromService || "server error while fetching all comment." })

  }
};

const addComment = async (req, res) => {
  try {
    const commentAdded = await commentService.add(req);

    return res.status(200).json(
      {
        api: config.api,
        comment: commentAdded,
        message: "comment added successfully"
      },
    );
  } catch (error) {
    return res
      .status(error.statusFromService || 500)
      .json({ message: error.msgFromService || "server error while adding comment." });
  }
};

const updateComment = async (req, res) => {
  try {
    const updated = await commentService.update(req);
    return res
      .status(200)
      .json(
        { api: config.api, comment: updated, message: "Comment updated successfully." },
      );
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Comment name must be unique" });
    }
    return res
      .status(error.statusFromService || 500)
      .json({ message: error.msgFromService || "error while updating comment" });
  }
};

const deleteComment = async (req, res) => {
  try {
    const deleted = await commentService.remove(req);
    return res
      .status(200)
      .json(
        { api: config.api, comment: deleted, message: "Comment deleted successfully" },
      );
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ message: "error while deleting comment" });
  }
};

const reactToComment = async (req, res) => {
  try {
    const action = await commentService.reaction(req);
    return res
      .status(200)
      .json(
        { api: config.api, comment: action, message: "reaction toggled successfully" },
      );
  } catch (error) {
    return res
      .status(error.status || 500)
      .json({ message: "error while toggling reaction" });
  }
};


export {
  addComment,
  getAllComments,
  updateComment,
  deleteComment,
  reactToComment
};

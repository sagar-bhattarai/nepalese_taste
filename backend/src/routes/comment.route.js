import express from "express";
import auth from "../middlewares/auth.middleware.js"
import { addComment, getAllComments, updateComment, deleteComment, reactToComment, getAllReactions} from "../controllers/comment.controller.js";
import addCommentSchema from "../zod/comment/addComment.schema.js";
import updateCommentSchema from "../zod/comment/updateComment.schema.js";
import addReactionSchema from "../zod/comment/addReaction.schema.js";
import zodValidation from "../middlewares/zodValidator.middleware.js";

const router = express.Router();

router.post("/reaction", auth, zodValidation(addReactionSchema), reactToComment);

router.post("/add", auth, zodValidation(addCommentSchema), addComment);
router.put("/edit/:id", auth, zodValidation(updateCommentSchema), reactToComment);
router.delete("/delete/:id", auth, deleteComment);
router.get("/:id", getAllComments);
router.get("/reactions/:commentId", getAllReactions);

export default router;
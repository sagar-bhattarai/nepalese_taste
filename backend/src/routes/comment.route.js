import express from "express";
import auth from "../middlewares/auth.middleware.js"
import { addComment, getAllComments, updateComment, deleteComment} from "../controllers/comment.controller.js";
// import addCategorySchema from "../zod/categories/addCategory.schema.js";

const router = express.Router();

// router.post("/add", auth, zodValidation(addCategorySchema), addComment);
router.post("/add", auth, addComment);
router.put("/edit/:id", auth, updateComment);
router.delete("/delete/:id", auth, deleteComment);
router.get("/:id", getAllComments);

export default router;
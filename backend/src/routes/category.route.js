import express from "express";
import authMiddleWare from "../middlewares/authMiddleware.js"
import {addCategory, getCategoryById, getAllCategories, updateCategory, deleteCategory} from "../controllers/category.controller.js";
import zodValidation from "../middlewares/validator/zod.validator.js";
import addCategorySchema from "../zod/category/addCategory.schema.zod.js";
const router = express.Router();

router.post("/add", authMiddleWare, zodValidation(addCategorySchema), addCategory);
router.get("/all", getAllCategories);
router.delete("/delete/:id", authMiddleWare, deleteCategory);
router.put("/update/:id", authMiddleWare, updateCategory);
// router.get("/:id", getCategoryById);

export default router;
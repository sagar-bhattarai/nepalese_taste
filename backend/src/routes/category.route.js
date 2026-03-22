import express from "express";
import authMiddleWare from "../middlewares/auth.middleware.js"
import {addCategory, getCategoryById, getAllCategories, updateCategory, deleteCategory} from "../controllers/category.controller.js";
import zodValidation from "../middlewares/zodValidator.middleware.js";
import addCategorySchema from "../zod/categories/addCategory.schema.js";
const router = express.Router();

router.post("/add", authMiddleWare, zodValidation(addCategorySchema), addCategory);
router.get("/all", getAllCategories);
router.delete("/delete/:id", authMiddleWare, deleteCategory);
router.put("/update/:id", authMiddleWare, updateCategory);
// router.get("/:id", getCategoryById);

export default router;
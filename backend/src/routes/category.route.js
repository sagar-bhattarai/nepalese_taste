import express from "express";
import auth from "../middlewares/auth.middleware.js"
import {addCategory, getCategoryById, getAllCategories, updateCategory, deleteCategory} from "../controllers/category.controller.js";
import zodValidation from "../middlewares/zodValidator.middleware.js";
import addCategorySchema from "../zod/categories/addCategory.schema.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.middleware.js";
import { STAFF, ADMIN } from "../constants/roles.constant.js";
import {upload} from "../middlewares/multer.middleware.js";

const router = express.Router();

router.get("/", getAllCategories);
router.post("/add", auth, roleBasedAuth(ADMIN), upload.array("categoryImage"), zodValidation(addCategorySchema), addCategory);
router.patch("/update/:id", auth, roleBasedAuth(ADMIN), upload.array("categoryImage"),  updateCategory);
router.delete("/delete/:id", auth, roleBasedAuth(ADMIN), deleteCategory);
router.get("/:id", getCategoryById);

export default router;
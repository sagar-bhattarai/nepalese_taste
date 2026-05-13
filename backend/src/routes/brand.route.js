import express from "express";
import auth from "../middlewares/auth.middleware.js"
import {addBrand, getBrandById, getAllBrands, updateBrand, deleteBrand} from "../controllers/brand.controller.js";
import zodValidation from "../middlewares/zodValidator.middleware.js";
import addBrandSchema from "../zod/brands/addBrand.schema.js";
import roleBasedAuth from "../middlewares/roleBasedAuth.middleware.js";
import { STAFF, ADMIN } from "../constants/roles.constant.js";
import {upload} from "../middlewares/multer.middleware.js";

const router = express.Router();

router.get("/", getAllBrands);
router.post("/add", auth, roleBasedAuth(ADMIN), upload.array("brandImage"), zodValidation(addBrandSchema), addBrand);
router.patch("/update/:id", auth, roleBasedAuth(ADMIN), upload.array("brandImage"),  updateBrand);
router.delete("/delete/:id", auth, roleBasedAuth(ADMIN), deleteBrand);
router.get("/:id", getBrandById);

export default router;